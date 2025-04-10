import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import CharacterInfo from "./CharacterInfo";
import useGetCharacter from "@/hooks/useGetCharacter";
import CharacterDetailsLoading from "./CharacterDetailsLoading";
import ErrorComponent from "@/components/ErrorComponent";

interface ICharacterDetails {
  characterId: number;
  children: React.ReactNode;
}

const DialogBody = ({ characterId }: { characterId: number }) => {
  const { loading, data, error, refetch } = useGetCharacter({
    id: characterId,
  });

  const handleRefetch = () => {
    refetch();
  };

  if (loading) {
    return <CharacterDetailsLoading />;
  }
  if (error) {
    return <ErrorComponent onRetry={handleRefetch} />;
  }
  if (data) {
    return <CharacterInfo character={data?.character} />;
  }
};

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
              <DialogBody characterId={characterId} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CharacterDetails;
