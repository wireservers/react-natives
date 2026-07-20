import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
  Combobox,
  CommandPalette,
  FileUpload,
  FormBuilder,
  Kanban,
  ProductTour,
  RichTextEditor,
  useTourAnchor,
  type FieldSchema,
  type KanbanColumn,
  type UploadFile,
} from "@wireservers-ui/react-natives-pro";

const FORM_SCHEMA: FieldSchema[] = [
  { name: "email", label: "Email", type: "email", step: 0, rules: { required: true } },
  {
    name: "plan", label: "Plan", type: "select", step: 1, defaultValue: "pro",
    options: [
      { label: "Pro", value: "pro" },
      { label: "Team", value: "team" },
    ],
  },
  {
    name: "seats", label: "Seats", type: "number", step: 1,
    showIf: { field: "plan", value: "team" },
    rules: { required: true, min: 2 },
    help: "Only shown for Team",
  },
  { name: "notes", label: "Notes", type: "textarea", step: 2 },
];

const FRUIT = [
  "Apple", "Apricot", "Banana", "Blackberry", "Blueberry", "Cherry",
  "Date", "Elderberry", "Fig", "Grape", "Kiwi", "Lemon", "Mango",
];

const INITIAL_COLUMNS: KanbanColumn[] = [
  {
    id: "todo", title: "To do",
    cards: [
      { id: "c1", title: "Ship Pro 0.1.0", badge: "P1" },
      { id: "c2", title: "Write launch post" },
    ],
  },
  { id: "doing", title: "In progress", limit: 2, cards: [{ id: "c3", title: "Wire Stripe webhook" }] },
  { id: "done", title: "Done", cards: [{ id: "c4", title: "Sign licence keys" }] },
];

export function ProPanelTwo({ onBack }: { onBack: () => void }) {
  const [tourOpen, setTourOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [combo, setCombo] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<string>("none");
  const [columns, setColumns] = useState<KanbanColumn[]>(INITIAL_COLUMNS);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [rejected, setRejected] = useState<string>("none");
  const [markdown, setMarkdown] = useState("# Hello\n\nSome **bold** and _italic_ text.\n\n- one\n- two");
  const [log, setLog] = useState("none");

  const uploadAnchor = useTourAnchor("upload");
  const kanbanAnchor = useTourAnchor("kanban");

  return (
    <ProductTour
      open={tourOpen}
      onOpenChange={setTourOpen}
      onFinish={() => setLog("tour finished")}
      onSkip={() => setLog("tour skipped")}
      steps={[
        { target: "upload", title: "Upload anything", body: "Drag files in, or click to browse.", placement: "bottom" },
        { target: "kanban", title: "Move work along", body: "Drag cards between columns.", placement: "top" },
        { title: "That's it", body: "Have a look around." },
      ]}
    >
      <ScrollView className="flex-1 bg-background-0" contentContainerStyle={{ padding: 16, paddingTop: 56 }}>
        <View className="mb-3 flex-row items-center gap-2">
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Back to panel one"
            className="rounded-md border border-outline-300 px-3 py-1.5"
          >
            <Text className="text-xs text-typography-900">← Panel 1</Text>
          </Pressable>
          <Text className="text-lg font-bold text-typography-900">Pro panel 2</Text>
        </View>
        <Text className="mb-4 text-[11px] text-typography-500">log: {log}</Text>

        {/* Command palette */}
        <Section title="CommandPalette">
          <Pressable
            onPress={() => setPaletteOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Open command palette"
            className="self-start rounded-md bg-primary-500 px-3 py-2"
          >
            <Text className="text-xs font-medium text-typography-0">Open palette (⌘K)</Text>
          </Pressable>
          <CommandPalette
            open={paletteOpen}
            onOpenChange={setPaletteOpen}
            commands={[
              { id: "tour", label: "Start product tour", group: "Help", run: () => setTourOpen(true) },
              { id: "reset", label: "Reset board", group: "Actions", run: () => setColumns(INITIAL_COLUMNS) },
              { id: "clear", label: "Clear uploads", group: "Actions", run: () => setFiles([]) },
              { id: "back", label: "Back to panel one", group: "Navigate", run: onBack },
            ]}
          />
        </Section>

        {/* Combobox */}
        <Section title={`Combobox — selected: ${combo.join(", ") || "none"}`}>
          <Combobox
            multiple
            options={FRUIT.map((f) => ({ id: f.toLowerCase(), label: f, value: f.toLowerCase() }))}
            onChange={(value: string[] | string | null) =>
              setCombo(Array.isArray(value) ? value : value ? [value] : [])
            }
            placeholder="Search fruit…"
          />
        </Section>

        {/* Form builder */}
        <Section title={`FormBuilder (wizard) — submitted: ${submitted}`}>
          <FormBuilder
            wizard
            schema={FORM_SCHEMA}
            onSubmit={(values) => setSubmitted(JSON.stringify(values))}
          />
        </Section>

        {/* File upload */}
        <Section title={`FileUpload — ${files.length} file(s) · rejected: ${rejected}`}>
          <View {...uploadAnchor}>
            <FileUpload
              files={files}
              onFilesChange={setFiles}
              accept={["image/*", ".pdf", ".csv"]}
              maxSize={5 * 1024 * 1024}
              maxFiles={4}
              dedupe
              hint="Images, PDF or CSV"
              onRejected={(messages) => setRejected(messages.join("; "))}
              onPickFiles={async () => []}
            />
          </View>
        </Section>

        {/* Kanban */}
        <Section title="Kanban">
          <View {...kanbanAnchor} style={{ height: 300 }}>
            <Kanban
              columns={columns}
              onChange={(next) => { setColumns(next); setLog("kanban changed"); }}
              onCardPress={(card) => setLog(`card pressed ${card.id}`)}
            />
          </View>
        </Section>

        {/* Rich text */}
        <Section title="RichTextEditor">
          <RichTextEditor value={markdown} onChange={setMarkdown} preview />
        </Section>

        {/* Product tour */}
        <Section title="ProductTour">
          <Pressable
            onPress={() => setTourOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Start tour"
            className="self-start rounded-md bg-primary-500 px-3 py-2"
          >
            <Text className="text-xs font-medium text-typography-0">Start tour</Text>
          </Pressable>
        </Section>
      </ScrollView>
    </ProductTour>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-6 border-t border-outline-100 pt-3">
      <Text className="mb-2 text-xs font-semibold text-typography-900">{title}</Text>
      {children}
    </View>
  );
}
