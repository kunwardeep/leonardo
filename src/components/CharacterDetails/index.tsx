import { Button, CloseButton, Dialog, Link, Portal } from "@chakra-ui/react";

interface ICharacterDetails {
  characterId: number;
  name: string;
  children: React.ReactNode;
}

const CharacterDetails = ({
  characterId,
  children,
  name,
}: ICharacterDetails) => {
  return (
    <Dialog.Root scrollBehavior="inside" size="lg">
      <Dialog.Trigger asChild>
        <Button variant="plain" position="static">
          {children} <span className="absolute z-10 inset-0 "></span>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{name}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body>{characterId}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CharacterDetails;
