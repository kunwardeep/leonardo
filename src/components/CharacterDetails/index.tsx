import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import CharacterInfo from "./CharacterInfo";

interface ICharacterDetails {
  characterId: number;
  children: React.ReactNode;
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

export default CharacterDetails;
