/**
 * Minimal ZIP writer (stored / no compression).
 *
 * An .xlsx is a ZIP of XML parts. Pulling in a full spreadsheet library for that would add
 * roughly a megabyte to a React Native bundle, which is a poor trade for one export button —
 * so this writes the container directly. Entries are STORED rather than deflated: it costs
 * file size but avoids shipping a compression implementation, and export payloads are small.
 */

/** CRC-32 (IEEE 802.3), required by the ZIP local and central headers. */
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

export function crc32(bytes: Uint8Array): number {
  let crc = -1;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

/** UTF-8 encode without depending on TextEncoder (absent on some RN runtimes). */
export function utf8Bytes(input: string): Uint8Array {
  const out: number[] = [];
  for (let i = 0; i < input.length; i += 1) {
    let code = input.charCodeAt(i);
    if (code < 0x80) {
      out.push(code);
    } else if (code < 0x800) {
      out.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code >= 0xd800 && code <= 0xdbff) {
      const next = input.charCodeAt(i + 1);
      code = 0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00);
      i += 1;
      out.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    } else {
      out.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
  }
  return Uint8Array.from(out);
}

export interface ZipEntry {
  /** Path within the archive, forward-slash separated. */
  name: string;
  data: Uint8Array;
}

function writeUint32(target: number[], value: number) {
  target.push(value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff);
}

function writeUint16(target: number[], value: number) {
  target.push(value & 0xff, (value >>> 8) & 0xff);
}

/**
 * Build a ZIP archive from the given entries.
 *
 * Timestamps are fixed rather than taken from the clock so the same input always produces
 * byte-identical output — which is what makes the export testable against a fixture.
 */
export function createZip(entries: ZipEntry[]): Uint8Array {
  const DOS_TIME = 0; // 00:00:00
  const DOS_DATE = 0x2100; // 1980-01-01, the ZIP epoch

  const output: number[] = [];
  const central: number[] = [];
  const offsets: number[] = [];

  for (const entry of entries) {
    const nameBytes = utf8Bytes(entry.name);
    const crc = crc32(entry.data);
    offsets.push(output.length);

    // Local file header
    writeUint32(output, 0x04034b50);
    writeUint16(output, 20); // version needed
    writeUint16(output, 0x0800); // UTF-8 filename flag
    writeUint16(output, 0); // stored
    writeUint16(output, DOS_TIME);
    writeUint16(output, DOS_DATE);
    writeUint32(output, crc);
    writeUint32(output, entry.data.length); // compressed size == uncompressed (stored)
    writeUint32(output, entry.data.length);
    writeUint16(output, nameBytes.length);
    writeUint16(output, 0); // extra field length
    for (let i = 0; i < nameBytes.length; i += 1) output.push(nameBytes[i]);
    for (let i = 0; i < entry.data.length; i += 1) output.push(entry.data[i]);
  }

  entries.forEach((entry, index) => {
    const nameBytes = utf8Bytes(entry.name);
    const crc = crc32(entry.data);

    // Central directory header
    writeUint32(central, 0x02014b50);
    writeUint16(central, 20); // version made by
    writeUint16(central, 20); // version needed
    writeUint16(central, 0x0800);
    writeUint16(central, 0);
    writeUint16(central, DOS_TIME);
    writeUint16(central, DOS_DATE);
    writeUint32(central, crc);
    writeUint32(central, entry.data.length);
    writeUint32(central, entry.data.length);
    writeUint16(central, nameBytes.length);
    writeUint16(central, 0); // extra
    writeUint16(central, 0); // comment
    writeUint16(central, 0); // disk number
    writeUint16(central, 0); // internal attrs
    writeUint32(central, 0); // external attrs
    writeUint32(central, offsets[index]);
    for (let i = 0; i < nameBytes.length; i += 1) central.push(nameBytes[i]);
  });

  const centralOffset = output.length;
  for (let i = 0; i < central.length; i += 1) output.push(central[i]);

  // End of central directory
  writeUint32(output, 0x06054b50);
  writeUint16(output, 0); // disk
  writeUint16(output, 0); // disk with central dir
  writeUint16(output, entries.length);
  writeUint16(output, entries.length);
  writeUint32(output, central.length);
  writeUint32(output, centralOffset);
  writeUint16(output, 0); // comment length

  return Uint8Array.from(output);
}
