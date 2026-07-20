import "./global.css";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  type DataGridColumn,
  type DataGridSort,
} from "@wireservers-ui/react-natives";
import {
  DataGridPro,
  DateRangePicker,
  Scheduler,
  LineChart,
  BarChart,
  DonutChart,
  StatTile,
  setLicenseKey,
  type DateRange,
  type SchedulerEvent,
} from "@wireservers-ui/react-natives-pro";
import { ProPanelTwo } from "./ProPanelTwo";

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
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [schedEvents, setSchedEvents] = useState<SchedulerEvent[]>(() => {
    const d = new Date();
    const on = (dayOffset: number, h: number, dur: number): SchedulerEvent => {
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate() + dayOffset, h, 0);
      return {
        id: `e${dayOffset}-${h}`,
        title: `Event ${dayOffset}/${h}`,
        start,
        end: new Date(start.getTime() + dur * 60000),
      };
    };
    return [on(0, 9, 60), on(0, 10, 90), on(1, 13, 60)];
  });
  const [schedLog, setSchedLog] = useState<string>("none");
  const [rows, setRows] = useState<Row[]>(() => makeRows(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<DataGridSort | null>(null);
  const [endReachedCount, setEndReachedCount] = useState(0);
  // Default is the original layout, so the existing e2e suites keep passing without
  // having to navigate anywhere first.
  const [panel, setPanel] = useState<"one" | "two">("one");

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

  if (panel === "two") {
    return <ProPanelTwo onBack={() => setPanel("one")} />;
  }

  return (
    <View className="flex-1 bg-background-0 px-4 pt-16">
      <Text className="mb-1 text-xl font-bold text-typography-900">
        DataGrid v2.1.0 verification
      </Text>
      <Pressable
        onPress={() => setPanel("two")}
        accessibilityRole="button"
        accessibilityLabel="Show panel two"
        className="mb-2 self-start rounded-md bg-primary-500 px-3 py-1.5"
      >
        <Text className="text-xs font-medium text-typography-0">Panel 2 →</Text>
      </Pressable>
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

      <View className="border-t border-outline-100 pt-2">
        <Text className="mb-1 text-xs font-semibold text-typography-900">
          DateRangePicker — {range.start ? range.start.toDateString() : "no start"} →{" "}
          {range.end ? range.end.toDateString() : "no end"}
        </Text>
        <DateRangePicker value={range} onChange={setRange} numberOfMonths={2} />
      </View>

      <View className="border-t border-outline-100 pt-3 pb-3">
        <Text className="mb-2 text-xs font-semibold text-typography-900">Charts</Text>
        <View className="flex-row flex-wrap gap-3">
          <LineChart
            series={[{ id: "a", data: [3, 7, 4, 9, 6, 11, 8].map((y, x) => ({ x, y })) }]}
            width={260}
            height={140}
          />
          <BarChart
            series={[{ id: "b", data: [12, 19, 7, 15].map((y, x) => ({ x, y })) }]}
            labels={["Q1", "Q2", "Q3", "Q4"]}
            width={220}
            height={140}
          />
          <DonutChart
            slices={[
              { id: "pro", value: 40 },
              { id: "team", value: 35 },
              { id: "ent", value: 25 },
            ]}
            size={140}
            centerLabel="100"
          />
          <StatTile label="MRR" value="$4,280" delta={12.4} sparkline={[3, 5, 4, 7, 6, 9, 11]} />
        </View>
      </View>

      <View className="border-t border-outline-100 pt-2" style={{ height: 420 }}>
        <Text className="mb-1 text-xs font-semibold text-typography-900">
          Scheduler — {schedEvents.length} events · last: {schedLog}
        </Text>
        <Scheduler
          events={schedEvents}
          onEventCreate={(draft) => {
            setSchedEvents((prev) => [
              ...prev,
              { id: `new-${prev.length}`, title: "New", start: draft.start, end: draft.end },
            ]);
            setSchedLog(`created ${draft.start.getHours()}:00`);
          }}
          onEventChange={(next) => {
            setSchedEvents((prev) => prev.map((e) => (e.id === next.id ? next : e)));
            setSchedLog(`changed ${next.id} -> ${next.start.getHours()}:${String(next.start.getMinutes()).padStart(2, "0")}`);
          }}
          onEventPress={(e) => setSchedLog(`pressed ${e.id}`)}
        />
      </View>
    </View>
  );
}
