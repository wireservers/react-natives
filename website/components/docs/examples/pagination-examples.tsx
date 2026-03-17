import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, Text } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg'] as const;

export default function PaginationExamples() {
  const [size, setSize] = useState<string>('md');
  const [page, setPage] = useState(1);
  const totalPages = 10;

  useExampleCode(`import { Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@wireservers-ui/react-natives';

export default function Example() {
  const [page, setPage] = useState(1);
  return (
    <Pagination size="${size}">
      <PaginationPrevious onPress={() => setPage(p => Math.max(1, p - 1))}>
        Prev
      </PaginationPrevious>
      <PaginationItem isActive={page === 1} onPress={() => setPage(1)}>1</PaginationItem>
      <PaginationItem isActive={page === 2} onPress={() => setPage(2)}>2</PaginationItem>
      <PaginationItem isActive={page === 3} onPress={() => setPage(3)}>3</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem isActive={page === 10} onPress={() => setPage(10)}>10</PaginationItem>
      <PaginationNext onPress={() => setPage(p => Math.min(10, p + 1))}>
        Next
      </PaginationNext>
    </Pagination>
  );
}`, [size, page]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Navigate through pages.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <Pagination size={size as any} className="mt-2">
          <PaginationPrevious onPress={() => setPage(p => Math.max(1, p - 1))}>
            Prev
          </PaginationPrevious>
          {[1, 2, 3].map(p => (
            <PaginationItem key={p} isActive={page === p} onPress={() => setPage(p)}>
              {p}
            </PaginationItem>
          ))}
          <PaginationEllipsis />
          <PaginationItem isActive={page === totalPages} onPress={() => setPage(totalPages)}>
            {totalPages}
          </PaginationItem>
          <PaginationNext onPress={() => setPage(p => Math.min(totalPages, p + 1))}>
            Next
          </PaginationNext>
        </Pagination>
        <Text className="text-sm text-typography-500 mt-1">Page {page} of {totalPages}</Text>
      </ExampleSection>
    </View>
  );
}
