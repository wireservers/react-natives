import "./global.css";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  type DataGridColumn,
  type DataGridSort,
} from "@wireservers-ui/react-natives";
import {
  DataGridPro,
  setLicenseKey,
  getLicenseStatus,
} from "@wireservers-ui/react-natives-pro";

// Genuine key minted with the real signing key, for verifying the licensed path.
const VALID_KEY =
  "WSUI1.eyJlbWFpbCI6InRvZGRAd2lyZXNlcnZlcnMuY29tIiwicHJvZHVjdCI6InJlYWN0LW5hdGl2ZXMtcHJvIiwiZWRpdGlvbiI6InBybyIsImlzc3VlZEF0IjoxNzg0NDk3NDM1LCJzZWF0cyI6NX0.EiN_i_F9ZIwpKmnvjYS8qedA_NonqaczaeN61jyqkxpwfjhUZuJ6am3vopALhI7Cfte-9Ybq732qWXJOBEjAAw";

const PAGE_SIZE = 25;
const TOTAL_AVAILABLE = 120;

type Row = {
  id: number;
  name: string;
  qty: number;
  note: string;
  extra: string;
  ok: boolean;
};

function makeRows(from: number, count: number): Row[] {
  const names = ["pear", "Apple", "banana", "Cherry", "date", "Fig", "grape"];
  return Array.from({ length: count }, (_, i) => {
    const id = from + i;
    return {
      id,
      name: `${names[id % names.length]} ${id}`,
      qty: (id * 7) % 40,
      note: `note for row ${id}`,
      extra: `extra payload ${id}`,
      ok: id % 3 === 0,
    };
  });
}

// Wide enough to force horizontal scrolling so pinned edges are actually observable.
const columns: DataGridColumn[] = [
  { id: "id", title: "ID", kind: "number", width: 70, pinned: "left" },
  { id: "name", title: "Name", width: 200 },
  { id: "qty", title: "Qty", kind: "number", width: 120 },
  { id: "note", title: "Note", width: 260 },
  { id: "extra", title: "Extra", width: 260 },
  { id: "ok", title: "OK", kind: "boolean", width: 90, pinned: "right" },
];

const unpinnedColumns: DataGridColumn[] = columns.map(({ pinned, ...rest }) => rest);

export default function App() {
  const [sticky, setSticky] = useState(true);
  const [manual, setManual] = useState(false);
  const [pinned, setPinned] = useState(true);
  const [licensed, setLicensed] = useState(false);
  const [lastExport, setLastExport] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>(() => makeRows(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<DataGridSort | null>(null);
  const [endReachedCount, setEndReachedCount] = useState(0);

  // Server-side sort simulation: when `manual` is on the grid must NOT reorder rows itself,
  // so we sort the source data here instead and hand back an already-ordered page.
  const data = useMemo(() => {
    if (!manual || !sort) return rows;
    const dir = sort.direction === "desc" ? -1 : 1;
    return [...rows].sort((a, b) => {
      const av = a[sort.columnId as keyof Row];
      const bv = b[sort.columnId as keyof Row];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [rows, manual, sort]);

  const loadMore = useCallback(() => {
    setEndReachedCount((n) => n + 1);
    if (loading) return;
    if (rows.length >= TOTAL_AVAILABLE) return;
    setLoading(true);
    setTimeout(() => {
      setRows((prev) => [...prev, ...makeRows(prev.length, PAGE_SIZE)]);
      setLoading(false);
    }, 600);
  }, [loading, rows.length]);

  const getCellContent = useCallback(
    (row: number, column: DataGridColumn) => {
      const record = data[row];
      if (!record) return "";
      return record[column.id as keyof Row] as string | number | boolean;
    },
    [data],
  );

  return (
    <View className="flex-1 bg-background-0 px-4 pt-16">
      <Text className="mb-1 text-xl font-bold text-typography-900">
        DataGrid v2.1.0 verification
      </Text>
      <Text className="mb-3 text-xs text-typography-500">
        rows {rows.length}/{TOTAL_AVAILABLE} · onEndReached fired {endReachedCount}× ·{" "}
        {loading ? "loading" : "idle"} · sort{" "}
        {sort ? `${sort.columnId}/${sort.direction}` : "none"}
      </Text>
      {lastExport ? (
        <Text className="mb-2 text-[10px] text-typography-400" numberOfLines={1}>
          last export: {lastExport}
        </Text>
      ) : null}

      <View className="mb-3 flex-row gap-2">
        <Pressable
          onPress={() => setSticky((v) => !v)}
          className="rounded-md border border-outline-300 px-3 py-2"
        >
          <Text className="text-xs text-typography-900">
            stickyHeader: {sticky ? "true" : "false"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setManual((v) => !v)}
          className="rounded-md border border-outline-300 px-3 py-2"
        >
          <Text className="text-xs text-typography-900">
            manualSort: {manual ? "true" : "false"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setPinned((v) => !v)}
          className="rounded-md border border-outline-300 px-3 py-2"
        >
          <Text className="text-xs text-typography-900">
            pinned: {pinned ? "ID + OK" : "none"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setLicenseKey(licensed ? "" : VALID_KEY);
            setLicensed((v) => !v);
          }}
          className="rounded-md border border-outline-300 px-3 py-2"
        >
          <Text className="text-xs text-typography-900">
            license: {licensed ? "valid" : "none"}
          </Text>
        </Pressable>
      </View>

      <View className="flex-1 pb-8">
        <DataGridPro
          exportFileName="grid-export"
          onExportCsv={(csv: string) => {
            // Capture instead of downloading so the export is observable in the harness.
            setLastExport(csv.split("\r\n").slice(0, 3).join(" | "));
          }}
          columns={pinned ? columns : unpinnedColumns}
          rowCount={data.length}
          getCellContent={getCellContent}
          getRowKey={(row: number) => String(data[row]?.id ?? row)}
          sortable
          filterable
          stickyHeader={sticky}
          manualSort={manual}
          sort={manual ? sort : undefined}
          onSortChange={setSort}
          loading={loading}
          onEndReached={loadMore}
        />
      </View>
    </View>
  );
}
