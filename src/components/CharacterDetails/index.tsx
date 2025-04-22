import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import CharacterInfo from "./CharacterInfo";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ICharacterDetails {
  characterId: number;
  children?: React.ReactNode;
}

const CharacterDetails = ({ characterId, children }: ICharacterDetails) => {
  return (
    <Dialog.Root scrollBehavior="inside" size="sm" lazyMount unmountOnExit>
      <Dialog.Trigger asChild>
        <Button variant="plain" position="unset">
          {children}
          <span className="absolute inset-0 "></span>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{"Character Details"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <CharacterInfo characterId={characterId} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default React.memo(CharacterDetails);

export const CharacterDetailsTry = ({
  characterId,
  modalOpen,
}: ICharacterDetails & {
  modalOpen: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(modalOpen);
  const router = useRouter();

  const handleClick = () => {
    console.log("close buttonclick");
    router.back();
    router.back();
    setIsOpen(false);
  };

  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      scrollBehavior="inside"
      size="sm"
      unmountOnExit
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{"Character Details"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" onClick={handleClick} />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <CharacterInfo characterId={characterId} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
