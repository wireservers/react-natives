import React, { useState } from 'react';
import { View, Text as RNText } from 'react-native';
import { ExampleSection } from '../example-section';
import { VariantPicker } from '../variant-picker';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectSearchInput,
  SelectSelectedBadges,
} from '@wireservers-ui/react-natives';
import type { SelectVariant } from '@wireservers-ui/react-natives';
import { useExampleCode } from '../example-code-context';

const countryLabels = {
  us: 'United States',
  uk: 'United Kingdom',
  ca: 'Canada',
  au: 'Australia',
  de: 'Germany',
  fr: 'France',
  jp: 'Japan',
};

const languageLabels = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  zh: 'Chinese',
};

const technologyLabels = {
  css: 'CSS',
  ember: 'Ember',
  html: 'HTML',
  react: 'React',
  nativewind: 'NativeWind',
  typescript: 'TypeScript',
  expo: 'Expo',
};

export default function SelectExamples() {
  const [variant, setVariant] = useState<SelectVariant>('outline');
  const [country, setCountry] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [priority, setPriority] = useState('');
  const [technologies, setTechnologies] = useState(['css', 'html']);

  useExampleCode(`import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectSearchInput,
  SelectSelectedBadges,
} from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Select
      isMulti
      defaultValues={['css', 'html']}
      valueLabels={{
        css: 'CSS',
        ember: 'Ember',
        html: 'HTML',
        react: 'React',
        nativewind: 'NativeWind',
        typescript: 'TypeScript',
        expo: 'Expo',
      }}
      variant="${variant}"
    >
      <SelectTrigger className="min-h-12 h-auto py-2">
        <SelectSelectedBadges maxVisible={3} />
        <SelectInput placeholder="Choose technologies" />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectSearchInput placeholder="Search technologies" />
          <SelectItem label="CSS" value="css" />
          <SelectItem label="Ember" value="ember" />
          <SelectItem label="HTML" value="html" />
          <SelectItem label="React" value="react" />
          <SelectItem label="NativeWind" value="nativewind" />
          <SelectItem label="TypeScript" value="typescript" />
          <SelectItem label="Expo" value="expo" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}`, [variant]);

  return (
    <View style={{ gap: 24 }}>
      <ExampleSection
        title="Basic Select"
        description="A dropdown for selecting a country."
      >
        <VariantPicker
          label="Variant"
          options={['outline', 'filled', 'underlined', 'rounded']}
          value={variant}
          onChange={(v) => setVariant(v as SelectVariant)}
        />
        <View style={{ gap: 8, marginTop: 8 }}>
          <Select
            selectedValue={country}
            onValueChange={setCountry}
            variant={variant}
          >
            <SelectTrigger>
              <SelectInput placeholder="Select a country" />
              <SelectIcon />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectItem label="United States" value="us" />
                <SelectItem label="United Kingdom" value="uk" />
                <SelectItem label="Canada" value="ca" />
                <SelectItem label="Australia" value="au" />
                <SelectItem label="Germany" value="de" />
                <SelectItem label="France" value="fr" />
                <SelectItem label="Japan" value="jp" />
              </SelectContent>
            </SelectPortal>
          </Select>
          {country ? (
            <RNText style={{ fontSize: 12, color: '#999' }}>
              Selected: {countryLabels[country as keyof typeof countryLabels]}
            </RNText>
          ) : null}
        </View>
      </ExampleSection>

      <ExampleSection
        title="Searchable Select"
        description="Add SelectSearchInput inside SelectContent to filter long option lists."
        code={`import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectSearchInput,
} from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Select placeholder="Select a country">
      <SelectTrigger>
        <SelectInput />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectSearchInput placeholder="Search countries" />
          <SelectItem label="United States" value="us" />
          <SelectItem label="United Kingdom" value="uk" />
          <SelectItem label="Canada" value="ca" />
          <SelectItem label="Australia" value="au" />
          <SelectItem label="Germany" value="de" />
          <SelectItem label="France" value="fr" />
          <SelectItem label="Japan" value="jp" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}`}
      >
        <View style={{ gap: 8 }}>
          <Select
            selectedValue={searchCountry}
            onValueChange={setSearchCountry}
            variant={variant}
            placeholder="Select a country"
          >
            <SelectTrigger>
              <SelectInput />
              <SelectIcon />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectSearchInput placeholder="Search countries" />
                <SelectItem label="United States" value="us" />
                <SelectItem label="United Kingdom" value="uk" />
                <SelectItem label="Canada" value="ca" />
                <SelectItem label="Australia" value="au" />
                <SelectItem label="Germany" value="de" />
                <SelectItem label="France" value="fr" />
                <SelectItem label="Japan" value="jp" />
              </SelectContent>
            </SelectPortal>
          </Select>
          {searchCountry ? (
            <RNText style={{ fontSize: 12, color: '#999' }}>
              Selected: {countryLabels[searchCountry as keyof typeof countryLabels]}
            </RNText>
          ) : null}
        </View>
      </ExampleSection>

      <ExampleSection
        title="Multi-Select with Badges"
        description="Enable isMulti and render SelectSelectedBadges in the trigger to show removable selections."
        code={`import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectSearchInput,
  SelectSelectedBadges,
} from '@wireservers-ui/react-natives';

const valueLabels = {
  css: 'CSS',
  ember: 'Ember',
  html: 'HTML',
  react: 'React',
  nativewind: 'NativeWind',
  typescript: 'TypeScript',
  expo: 'Expo',
};

export default function Example() {
  return (
    <Select
      isMulti
      defaultValues={['css', 'html']}
      valueLabels={valueLabels}
    >
      <SelectTrigger className="min-h-12 h-auto py-2">
        <SelectSelectedBadges maxVisible={3} />
        <SelectInput placeholder="Choose technologies" />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectSearchInput placeholder="Search technologies" />
          <SelectItem label="CSS" value="css" />
          <SelectItem label="Ember" value="ember" />
          <SelectItem label="HTML" value="html" />
          <SelectItem label="React" value="react" />
          <SelectItem label="NativeWind" value="nativewind" />
          <SelectItem label="TypeScript" value="typescript" />
          <SelectItem label="Expo" value="expo" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}`}
      >
        <View style={{ gap: 8 }}>
          <Select
            isMulti
            selectedValues={technologies}
            onValuesChange={setTechnologies}
            valueLabels={technologyLabels}
            variant={variant}
          >
            <SelectTrigger className="min-h-12 h-auto py-2">
              <SelectSelectedBadges maxVisible={3} />
              <SelectInput placeholder="Choose technologies" />
              <SelectIcon />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectSearchInput placeholder="Search technologies" />
                <SelectItem label="CSS" value="css" />
                <SelectItem label="Ember" value="ember" />
                <SelectItem label="HTML" value="html" />
                <SelectItem label="React" value="react" />
                <SelectItem label="NativeWind" value="nativewind" />
                <SelectItem label="TypeScript" value="typescript" />
                <SelectItem label="Expo" value="expo" />
              </SelectContent>
            </SelectPortal>
          </Select>
          <RNText style={{ fontSize: 12, color: '#999' }}>
            Selected: {technologies.length > 0 ? technologies.map((value) => technologyLabels[value as keyof typeof technologyLabels]).join(', ') : 'none'}
          </RNText>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Language Select"
        description="Select with a pre-defined set of language options."
        code={`import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectInput placeholder="Choose a language" />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectItem label="English" value="en" />
          <SelectItem label="Spanish" value="es" />
          <SelectItem label="French" value="fr" />
          <SelectItem label="German" value="de" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}`}
      >
        <Select
          selectedValue={language}
          onValueChange={setLanguage}
          variant={variant}
        >
          <SelectTrigger>
            <SelectInput placeholder="Choose a language" />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectItem label="English" value="en" />
              <SelectItem label="Spanish" value="es" />
              <SelectItem label="French" value="fr" />
              <SelectItem label="German" value="de" />
              <SelectItem label="Portuguese" value="pt" />
              <SelectItem label="Chinese" value="zh" />
            </SelectContent>
          </SelectPortal>
        </Select>
        {language ? (
          <RNText style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
            Selected: {languageLabels[language as keyof typeof languageLabels]}
          </RNText>
        ) : null}
      </ExampleSection>

      <ExampleSection
        title="Select with Disabled Items"
        description="Some options in the select are disabled."
        code={`import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectInput placeholder="Set priority" />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectItem label="Low" value="low" />
          <SelectItem label="Medium" value="medium" />
          <SelectItem label="High" value="high" />
          <SelectItem label="Critical" value="critical" isDisabled />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}`}
      >
        <Select
          selectedValue={priority}
          onValueChange={setPriority}
          variant={variant}
        >
          <SelectTrigger>
            <SelectInput placeholder="Set priority" />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectItem label="Low" value="low" />
              <SelectItem label="Medium" value="medium" />
              <SelectItem label="High" value="high" />
              <SelectItem label="Critical" value="critical" isDisabled />
            </SelectContent>
          </SelectPortal>
        </Select>
      </ExampleSection>

      <ExampleSection
        title="Disabled Select"
        description="Select with isDisabled prevents the dropdown from opening."
        code={`import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@wireservers-ui/react-natives';

export default function Example() {
  return (
    <Select selectedValue="us" isDisabled>
      <SelectTrigger>
        <SelectInput placeholder="Cannot change" />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectItem label="United States" value="us" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}`}
      >
        <Select
          selectedValue="us"
          variant={variant}
          isDisabled
        >
          <SelectTrigger>
            <SelectInput placeholder="Cannot change" />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectItem label="United States" value="us" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </ExampleSection>
    </View>
  );
}
