import { ed25519 } from '@noble/curves/ed25519';
import { base64UrlDecode, hexToBytes, utf8Decode, utf8Encode } from './encoding';

/**
 * Ed25519 public key for license verification.
 *
 * Safe to ship: it can only *verify* signatures, never produce them. The matching private key
 * lives solely in the license-issuing service and never enters this repository. Verification is
 * fully offline — activating a license never makes a network request, so a customer's app has
 * no runtime dependency on our infrastructure.
 */
const LICENSE_PUBLIC_KEY_HEX = 'a1b9e1be1b3be8104788250eb42a59d44dab5ba6cb66e2197bb6a22ccad27290';

/** Key format marker. Bumped only if the payload shape changes incompatibly. */
const KEY_PREFIX = 'WSUI1';

export type LicenseEdition = 'pro' | 'team' | 'enterprise';

export interface LicensePayload {
  /** Email the license was issued to. */
  email: string;
  /** Product identifier — guards against a key for another product being accepted here. */
  product: string;
  edition: LicenseEdition;
  /** Seats purchased. Informational: nothing is enforced at runtime. */
  seats?: number;
  /** Issued-at, epoch seconds. */
  issuedAt: number;
  /** Expiry, epoch seconds. Omitted for perpetual licenses. */
  expiresAt?: number;
}

export type LicenseInvalidReason =
  | 'missing'
  | 'malformed'
  | 'bad-signature'
  | 'wrong-product'
  | 'expired';

export type LicenseStatus =
  | { valid: true; license: LicensePayload }
  | { valid: false; reason: LicenseInvalidReason };

export const PRO_PRODUCT_ID = 'react-natives-pro';

let currentStatus: LicenseStatus = { valid: false, reason: 'missing' };
let hasWarned = false;

/**
 * Parse and cryptographically verify a license key.
 *
 * Never throws: any malformed input resolves to an invalid status. Callers use this to decide
 * whether to show a watermark, never whether to render at all.
 */
export function verifyLicenseKey(key: string, now: Date = new Date()): LicenseStatus {
  if (typeof key !== 'string' || key.trim().length === 0) {
    return { valid: false, reason: 'missing' };
  }

  const parts = key.trim().split('.');
  if (parts.length !== 3 || parts[0] !== KEY_PREFIX) {
    return { valid: false, reason: 'malformed' };
  }

  const payloadBytes = base64UrlDecode(parts[1]);
  const signatureBytes = base64UrlDecode(parts[2]);
  const publicKeyBytes = hexToBytes(LICENSE_PUBLIC_KEY_HEX);
  if (!payloadBytes || !signatureBytes || !publicKeyBytes) {
    return { valid: false, reason: 'malformed' };
  }

  // Signature covers the exact payload bytes, so tampering with any field invalidates the key.
  let signatureOk = false;
  try {
    signatureOk = ed25519.verify(signatureBytes, payloadBytes, publicKeyBytes);
  } catch {
    return { valid: false, reason: 'bad-signature' };
  }
  if (!signatureOk) {
    return { valid: false, reason: 'bad-signature' };
  }

  let payload: LicensePayload;
  try {
    payload = JSON.parse(utf8Decode(payloadBytes)) as LicensePayload;
  } catch {
    return { valid: false, reason: 'malformed' };
  }

  if (!payload || typeof payload.email !== 'string' || typeof payload.issuedAt !== 'number') {
    return { valid: false, reason: 'malformed' };
  }
  if (payload.product !== PRO_PRODUCT_ID) {
    return { valid: false, reason: 'wrong-product' };
  }
  if (typeof payload.expiresAt === 'number' && payload.expiresAt * 1000 < now.getTime()) {
    return { valid: false, reason: 'expired' };
  }

  return { valid: true, license: payload };
}

const REASON_MESSAGE: Record<LicenseInvalidReason, string> = {
  missing: 'No license key has been set.',
  malformed: 'The license key could not be read.',
  'bad-signature': 'The license key signature is not valid.',
  'wrong-product': 'That license key is for a different product.',
  expired: 'The license key has expired.',
};

/**
 * Activate a license. Call once at app startup, before rendering any Pro component.
 *
 * An absent or invalid key never disables anything — Pro components stay fully functional and
 * simply render an "unlicensed" watermark. Breaking a paying customer's production app because
 * of a key-delivery problem would be far worse than showing a watermark.
 */
export function setLicenseKey(key: string): LicenseStatus {
  // Bound to a local first: TypeScript won't narrow the discriminated union through a mutable
  // module-scope variable, and the local also keeps the returned status stable.
  const status = verifyLicenseKey(key);
  currentStatus = status;
  hasWarned = false;
  if (!status.valid) {
    warnOnce(status.reason);
  }
  return status;
}

export function getLicenseStatus(): LicenseStatus {
  return currentStatus;
}

export function isLicensed(): boolean {
  return currentStatus.valid;
}

/** Test-only: drop any activated license so specs start from a known state. */
export function __resetLicenseForTests(): void {
  currentStatus = { valid: false, reason: 'missing' };
  hasWarned = false;
}

export function warnOnce(reason: LicenseInvalidReason): void {
  if (hasWarned) return;
  hasWarned = true;
  // eslint-disable-next-line no-console
  console.warn(
    `[@wireservers-ui/react-natives-pro] ${REASON_MESSAGE[reason]} ` +
      'Pro components will render with an "unlicensed" watermark. ' +
      'Purchase or retrieve a key at https://reactnatives.com/pro and pass it to setLicenseKey().',
  );
}
