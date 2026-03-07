import React from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell, TableCaption, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

export default function TableExamples() {
  useExampleCode(`import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell, TableCaption } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Engineer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Charlie</TableCell>
          <TableCell>Manager</TableCell>
          <TableCell>Away</TableCell>
        </TableRow>
      </TableBody>
      <TableCaption>Team members</TableCaption>
    </Table>
  );
}`, []);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Basic Table" description="A structured data table with header and body rows." code={`import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell, TableCaption } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Engineer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
      <TableCaption>Team members</TableCaption>
    </Table>
  );
}`}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Alice</TableCell>
              <TableCell>Engineer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bob</TableCell>
              <TableCell>Designer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Charlie</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Away</TableCell>
            </TableRow>
          </TableBody>
          <TableCaption>Team members</TableCaption>
        </Table>
      </ExampleSection>
    </View>
  );
}
