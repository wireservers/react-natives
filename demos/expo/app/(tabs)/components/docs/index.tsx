import { Redirect } from 'expo-router';

export default function DocsIndex() {
  return <Redirect href={'/components' as any} />;
}
