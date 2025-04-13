import { Button, Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import CharacterAvatar from "./CharacterAvatar";
import React from "react";
import CharacterDetails from "@/components/CharacterDetails";
import CharacterCardShell from "./CharacterCardShell";
import { useRouter } from "next/navigation";

export interface ICharacterCard {
  id: number;
  species: string;
  status: string;
  gender: string;
  image: {
    src: string;
    alt: string;
  };
  name: string;
}

const CharacterCard = ({ id, image, name }: ICharacterCard) => {
  const router = useRouter();
  return (
    <CharacterCardShell>
      <Flex
        padding={3}
        gap={2}
        direction={"column"}
        align="center"
        justify="center"
        position={"relative"}
      >
        <CharacterAvatar src={image.src} alt={image.alt} />
        <CharacterDetails characterId={id}>
          <Tooltip
            aria-label={`Full name: ${name}`}
            content={name}
            showArrow
            positioning={{ placement: "top" }}
          >
            <Text
              padding={1}
              truncate
              fontWeight="semibold"
              lineClamp="1"
              zIndex={1}
              textAlign={"center"}
            >
              {name}
            </Text>
          </Tooltip>
        </CharacterDetails>
      </Flex>
      {/* non clickable area */}
      {/* <Flex
        hideBelow="lg"
        border={1}
        gap={1}
        direction={"column"}
        align="center"
        justify="center"
      >
        <CharacterProperties
          status={status}
          species={species}
          gender={gender}
        />
      </Flex> */}
      <Button onClick={() => router.push(`/character/${id}`)}>BUTTON </Button>
    </CharacterCardShell>
  );
};

export default React.memo(CharacterCard);
