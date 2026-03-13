import { Redirect } from 'expo-router';

import { SeoHead } from '@/components/seo/seo-head';

export default function DocsIndex() {
  return (
    <>
      <SeoHead
        title="Components Documentation | React-Natives"
        description="Browse React-Natives component documentation."
        path="/components"
        robots="noindex, follow"
      />
      <Redirect href={'/components' as any} />
    </>
  );
}
