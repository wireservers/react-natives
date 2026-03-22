import React, { useState } from 'react';
import { View } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import { TagsInput, TagsInputField, TagsInputTag, TagsInputTagText, TagsInputTagCloseButton } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const sizes = ['sm', 'md', 'lg'] as const;

export default function TagsInputExamples() {
  const [size, setSize] = useState<string>('md');
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);

  useExampleCode(`import { TagsInput, TagsInputField, TagsInputTag, TagsInputTagText, TagsInputTagCloseButton } from '@wireservers-ui/react-natives';

export default function Example() {
  const [tags, setTags] = useState(${JSON.stringify(tags)});
  return (
    <TagsInput value={tags} onValueChange={setTags} size="${size}">
      {tags.map(tag => (
        <TagsInputTag key={tag} value={tag}>
          <TagsInputTagText>{tag}</TagsInputTagText>
          <TagsInputTagCloseButton />
        </TagsInputTag>
      ))}
      <TagsInputField placeholder="Add tag..." />
    </TagsInput>
  );
}`, [size, tags]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection title="Interactive" description="Type a tag name and press Enter to add. Click × to remove.">
        <VariantPicker label="Size" options={[...sizes]} value={size} onChange={setSize} />
        <View style={{ marginTop: 8, maxWidth: 400 }}>
          <TagsInput value={tags} onValueChange={setTags} size={size as any}>
            {tags.map(tag => (
              <TagsInputTag key={tag} value={tag}>
                <TagsInputTagText>{tag}</TagsInputTagText>
                <TagsInputTagCloseButton />
              </TagsInputTag>
            ))}
            <TagsInputField placeholder="Add tag..." />
          </TagsInput>
        </View>
      </ExampleSection>
    </View>
  );
}
