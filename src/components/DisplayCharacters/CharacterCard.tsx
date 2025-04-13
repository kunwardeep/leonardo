import { Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import CharacterAvatar from "./CharacterAvatar";
import CharacterProperties from "./CharacterProperties";
import React from "react";
import CharacterDetails from "@/components/CharacterDetails";
import CharacterCardShell from "./CharacterCardShell";

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

const CharacterCard = ({
  id,
  image,
  name,
  status,
  species,
  gender,
}: ICharacterCard) => {
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
      <Flex
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
      </Flex>
    </CharacterCardShell>
  );
};

export default React.memo(CharacterCard);
