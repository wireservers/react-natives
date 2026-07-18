import React from 'react';
import { Text, View } from 'react-native';
import { DataGrid, type DataGridCell, type DataGridColumn } from '@wireservers-ui/react-natives';
import { ExampleSection } from '../example-section';
import { useExampleCode } from '../example-code-context';

const firstNames = ['Helene', 'Vanessa', 'Gina', 'Jenifer', 'Axel', 'Fae', 'Lourdes', 'Malcolm', 'Keith', 'Alene', 'John', 'Fermin'];
const lastNames = ['Zulauf', 'Schultz', 'Hermann', 'McCullough', 'Grimes', 'Turcotte', 'Leannon', 'Smith', 'Effertz', 'Collier', 'Schroeder', 'Raynor'];
const titles = ['Dynamic Interactions Agent', 'Direct Directives Administrator', 'Regional Tactics Orchestrator', 'Internal Integration Producer', 'Future Operations Assistant', 'Chief Functionality Administrator'];
const managers = ['Nickolas Hermiston', 'Leopoldo Nolan', 'Ivory Okuneva', 'Princess Conn', 'Lester King', 'Quinn Ratke'];

const columns: DataGridColumn[] = [
  { id: 'firstName', title: 'First name', group: 'Name', kind: 'text', width: 164, editable: true },
  { id: 'lastName', title: 'Last name', group: 'Name', kind: 'text', width: 164, editable: true },
  { id: 'photo', title: 'Photo', group: 'Info', kind: 'image', width: 92, align: 'center', editable: false },
  { id: 'optIn', title: 'Opt-In', group: 'Info', kind: 'boolean', width: 92, align: 'center' },
  { id: 'manager', title: 'Manager', group: 'Employment Data', kind: 'bubble', width: 224 },
  { id: 'performance', title: 'Performance', group: 'Info', kind: 'custom', width: 250, editable: false },
  { id: 'title', title: 'Title', group: 'Info', kind: 'markdown', width: 320, editable: true },
  { id: 'profile', title: 'More', group: 'Links', kind: 'uri', width: 220, editable: false },
];

function getCellContent(row: number, column: DataGridColumn): DataGridCell | string | boolean {
  switch (column.id) {
    case 'firstName':
      return firstNames[row % firstNames.length];
    case 'lastName':
      return lastNames[(row * 3) % lastNames.length];
    case 'photo':
      return {
        kind: 'image',
        source: { uri: `https://picsum.photos/seed/rns-grid-${row}/64/64` },
        accessibilityLabel: `Employee ${row + 1} photo`,
      };
    case 'optIn':
      return row % 3 !== 1;
    case 'manager':
      return {
        kind: 'bubble',
        value: managers[row % managers.length],
      };
    case 'performance':
      return {
        kind: 'custom',
        value: row,
        displayValue: `${60 + (row % 35)}%`,
      };
    case 'title':
      return row === 4 ? '**Future** Operations Assistant' : titles[row % titles.length];
    case 'profile':
      return {
        kind: 'uri',
        value: `https://example.com/employees/${row + 1}`,
        href: `https://example.com/employees/${row + 1}`,
      };
    default:
      return '';
  }
}

function PerformanceCell({ row }: { row: number }) {
  const points = Array.from({ length: 12 }, (_, index) => 18 + ((row * 17 + index * 13) % 32));
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 30 }}>
      {points.map((height, index) => (
        <View
          key={index}
          style={{
            width: 10,
            height,
            borderRadius: 4,
            backgroundColor: row % 5 === 0 ? '#E8A99A' : '#A8D8D0',
            opacity: 0.9,
          }}
        />
      ))}
    </View>
  );
}

export default function DataGridExamples() {
  useExampleCode(`import { DataGrid, type DataGridColumn } from '@wireservers-ui/react-natives';

const columns: DataGridColumn[] = [
  { id: 'firstName', title: 'First name', group: 'Name', kind: 'text', width: 164, editable: true },
  { id: 'lastName', title: 'Last name', group: 'Name', kind: 'text', width: 164, editable: true },
  { id: 'photo', title: 'Photo', group: 'Info', kind: 'image', width: 92 },
  { id: 'optIn', title: 'Opt-In', group: 'Info', kind: 'boolean', width: 92 },
  { id: 'manager', title: 'Manager', group: 'Employment Data', kind: 'bubble', width: 224 },
  { id: 'title', title: 'Title', group: 'Info', kind: 'markdown', width: 320, editable: true },
  { id: 'profile', title: 'More', group: 'Links', kind: 'uri', width: 220 },
];

export default function Example() {
  return (
    <DataGrid
      columns={columns}
      rowCount={1_000_000}
      getCellContent={(row, column) => getCellContent(row, column)}
      rowHeight={(row) => (row % 9 === 0 ? 56 : 44)}
      selectionMode="multiple"
      selectionScope="mixed"
      editable
      allowColumnResize
      allowColumnReorder
      mergedCells={[{ row: 2, columnId: 'title', colSpan: 2 }]}
      onCellEdit={({ row, column, value }) => console.log(row, column.id, value)}
    />
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Virtualized Data Grid"
        description="A lazy grid with typed cells, editing, grouped headers, selection, resizing, reordering, variable row heights, and merged cells."
        code={`import { DataGrid, type DataGridColumn } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <DataGrid
      columns={columns}
      rowCount={1_000_000}
      getCellContent={getCellContent}
      rowHeight={(row) => (row % 9 === 0 ? 56 : 44)}
      selectionMode="multiple"
      selectionScope="mixed"
      editable
      allowColumnResize
      allowColumnReorder
    />
  );
}`}
      >
        <View style={{ height: 620 }}>
          <DataGrid
            columns={columns}
            rowCount={1_000_000}
            getCellContent={getCellContent}
            rowHeight={(row) => (row % 9 === 0 ? 56 : 44)}
            selectionMode="multiple"
            selectionScope="mixed"
            defaultSelection={{ cells: [{ row: 4, columnId: 'title' }], rows: [7] }}
            editable
            allowColumnResize
            allowColumnReorder
            mergedCells={[{ row: 2, columnId: 'title', colSpan: 2 }]}
            renderCell={({ row, column, cell }) => {
              if (column.id === 'performance') return <PerformanceCell row={row} />;
              if (column.id === 'title' && row === 2) {
                return <Text style={{ color: '#5B5F70', fontWeight: '700' }}>Merged title and link cells</Text>;
              }
              return undefined;
            }}
            onCellEdit={() => undefined}
          />
        </View>
      </ExampleSection>
    </View>
  );
}
