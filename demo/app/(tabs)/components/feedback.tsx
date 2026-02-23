import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import {
  Alert,
  AlertIcon,
  AlertBody,
  AlertText,
  Progress,
  ProgressFilledTrack,
  Link,
  LinkText,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Toast,
  ToastTitle,
  ToastDescription,
  Tooltip,
  TooltipContent,
  TooltipText,
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  ActionSheet,
  ActionSheetBackdrop,
  ActionSheetContent,
  ActionSheetDragIndicatorWrapper,
  ActionSheetDragIndicator,
  ActionSheetItem,
  ActionSheetItemText,
  Button,
  ButtonText,
} from "@wireservers-ui/components";

export default function FeedbackScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  return (
    <ScrollView
      className="flex-1 bg-background-0"
      contentContainerClassName="p-6 gap-8 pb-24"
    >
      {/* Alert Section */}
      <Section title="Alert">
        <Alert action="info" variant="solid">
          <AlertIcon />
          <AlertBody>
            <AlertText>This is an info alert (solid).</AlertText>
          </AlertBody>
        </Alert>

        <Alert action="success" variant="subtle">
          <AlertIcon />
          <AlertBody>
            <AlertText>This is a success alert (subtle).</AlertText>
          </AlertBody>
        </Alert>

        <Alert action="warning" variant="outline">
          <AlertIcon />
          <AlertBody>
            <AlertText>This is a warning alert (outline).</AlertText>
          </AlertBody>
        </Alert>

        <Alert action="error" variant="solid">
          <AlertIcon />
          <AlertBody>
            <AlertText>This is an error alert (solid).</AlertText>
          </AlertBody>
        </Alert>
      </Section>

      {/* Progress Section */}
      <Section title="Progress">
        <Text className="text-typography-600 text-sm">25% - Small</Text>
        <Progress value={25} size="sm">
          <ProgressFilledTrack />
        </Progress>

        <Text className="text-typography-600 text-sm">50% - Medium</Text>
        <Progress value={50} size="md">
          <ProgressFilledTrack />
        </Progress>

        <Text className="text-typography-600 text-sm">75% - Large</Text>
        <Progress value={75} size="lg">
          <ProgressFilledTrack />
        </Progress>
      </Section>

      {/* Link Section */}
      <Section title="Link">
        <Link>
          <LinkText>Default Link</LinkText>
        </Link>

        <Link href="https://wireservers.com">
          <LinkText>External Link (wireservers.com)</LinkText>
        </Link>
      </Section>

      {/* Modal Section */}
      <Section title="Modal">
        <Button onPress={() => setShowModal(true)}>
          <ButtonText>Open Modal</ButtonText>
        </Button>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Text className="text-typography-900 text-lg font-semibold">
                Modal Title
              </Text>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Text className="text-typography-700">
                This is the modal body content. You can place any content here
                including forms, lists, or informational text.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                onPress={() => setShowModal(false)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button onPress={() => setShowModal(false)}>
                <ButtonText>Confirm</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Section>

      {/* Toast Section */}
      <Section title="Toast">
        <Text className="text-typography-500 text-sm italic">
          Note: Toast requires ToastProvider to wrap the app. The toast
          components below show the UI structure.
        </Text>

        <Toast action="success" variant="solid">
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Your action was completed successfully.</ToastDescription>
        </Toast>

        <Toast action="error" variant="outline">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong. Please try again.</ToastDescription>
        </Toast>
      </Section>

      {/* Tooltip Section */}
      <Section title="Tooltip">
        <Tooltip
          trigger={(triggerProps: any) => (
            <Button {...triggerProps}>
              <ButtonText>Hover or Press Me</ButtonText>
            </Button>
          )}
        >
          <TooltipContent>
            <TooltipText>This is a tooltip message</TooltipText>
          </TooltipContent>
        </Tooltip>
      </Section>

      {/* Drawer Section */}
      <Section title="Drawer">
        <Button onPress={() => setShowDrawer(true)}>
          <ButtonText>Open Drawer</ButtonText>
        </Button>

        <Drawer
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          anchor="right"
        >
          <DrawerBackdrop />
          <DrawerContent>
            <DrawerHeader>
              <Text className="text-typography-900 text-lg font-semibold">
                Drawer Title
              </Text>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody>
              <Text className="text-typography-700">
                This drawer slides in from the right. You can place navigation
                links, settings, or any content here.
              </Text>
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                onPress={() => setShowDrawer(false)}
              >
                <ButtonText>Close</ButtonText>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      {/* ActionSheet Section */}
      <Section title="ActionSheet">
        <Button onPress={() => setShowActionSheet(true)}>
          <ButtonText>Open Action Sheet</ButtonText>
        </Button>

        <ActionSheet
          isOpen={showActionSheet}
          onClose={() => setShowActionSheet(false)}
        >
          <ActionSheetBackdrop />
          <ActionSheetContent>
            <ActionSheetDragIndicatorWrapper>
              <ActionSheetDragIndicator />
            </ActionSheetDragIndicatorWrapper>

            <ActionSheetItem onPress={() => setShowActionSheet(false)}>
              <ActionSheetItemText>Edit</ActionSheetItemText>
            </ActionSheetItem>

            <ActionSheetItem onPress={() => setShowActionSheet(false)}>
              <ActionSheetItemText>Duplicate</ActionSheetItemText>
            </ActionSheetItem>

            <ActionSheetItem onPress={() => setShowActionSheet(false)}>
              <ActionSheetItemText>Share</ActionSheetItemText>
            </ActionSheetItem>

            <ActionSheetItem onPress={() => setShowActionSheet(false)}>
              <ActionSheetItemText>Delete</ActionSheetItemText>
            </ActionSheetItem>
          </ActionSheetContent>
        </ActionSheet>
      </Section>
    </ScrollView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Text className="text-typography-900 text-xl font-bold">{title}</Text>
      <React.Fragment>{children}</React.Fragment>
    </React.Fragment>
  );
}
