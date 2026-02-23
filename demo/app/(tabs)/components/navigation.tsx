import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import {
  Tabs,
  TabList,
  Tab,
  TabText,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbText,
  Fab,
  FabIcon,
  FabLabel,
} from "@wireservers-ui/components";

export default function NavigationScreen() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <ScrollView
      className="flex-1 bg-background-0"
      contentContainerClassName="p-6 gap-8 pb-24"
    >
      {/* Tabs */}
      <section className="gap-3">
        <Text className="text-2xl font-bold text-typography-900">Tabs</Text>
        <Text className="text-sm text-typography-500">
          Underlined variant with controlled selectedIndex.
        </Text>
        <Tabs
          value={selectedTabIndex}
          onValueChange={setSelectedTabIndex}
          variant="underlined"
        >
          <TabList>
            <Tab value={0}>
              <TabText>Overview</TabText>
            </Tab>
            <Tab value={1}>
              <TabText>Features</TabText>
            </Tab>
            <Tab value={2}>
              <TabText>Reviews</TabText>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value={0}>
              <Text className="text-typography-700 pt-3">
                This is the Overview tab content. It provides a high-level
                summary of the product or service.
              </Text>
            </TabPanel>
            <TabPanel value={1}>
              <Text className="text-typography-700 pt-3">
                This is the Features tab content. It highlights the key
                capabilities and functionality available.
              </Text>
            </TabPanel>
            <TabPanel value={2}>
              <Text className="text-typography-700 pt-3">
                This is the Reviews tab content. It shows user feedback and
                ratings from verified customers.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>

      {/* Accordion */}
      <section className="gap-3">
        <Text className="text-2xl font-bold text-typography-900">
          Accordion
        </Text>
        <Text className="text-sm text-typography-500">
          Multiple items can be expanded simultaneously. Collapsible enabled.
        </Text>
        <Accordion type="multiple" isCollapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <AccordionTitleText>Getting Started</AccordionTitleText>
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-typography-700">
                Follow the installation guide to set up the project. Run npm
                install to fetch all dependencies and then start the development
                server with npm run dev.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <AccordionTitleText>Configuration</AccordionTitleText>
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-typography-700">
                Customize the theme, colors, and typography through the config
                file. You can override default tokens and add your own design
                variables.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <AccordionTitleText>Deployment</AccordionTitleText>
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>
              <Text className="text-typography-700">
                Build the production bundle with npm run build. The output can be
                deployed to any static hosting provider or served via a Node.js
                server.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Breadcrumb */}
      <section className="gap-3">
        <Text className="text-2xl font-bold text-typography-900">
          Breadcrumb
        </Text>
        <Text className="text-sm text-typography-500">
          Three-level navigation path with the last item marked as current.
        </Text>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <BreadcrumbText>Home</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <BreadcrumbText>Products</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrent>
            <BreadcrumbLink>
              <BreadcrumbText>Detail</BreadcrumbText>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </section>

      {/* Fab */}
      <section className="gap-3">
        <Text className="text-2xl font-bold text-typography-900">Fab</Text>
        <Text className="text-sm text-typography-500">
          Floating Action Button is absolutely positioned. The extended variant
          shown below renders in the bottom-right corner of the screen.
        </Text>
      </section>

      <Fab placement="bottom right" isExtended>
        <FabIcon />
        <FabLabel>Create</FabLabel>
      </Fab>
    </ScrollView>
  );
}
