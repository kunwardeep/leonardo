import { Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { useEffect, useState } from "react";
import CharacterAvatar from "./CharacterAvatar";
import CharacterProperties from "./CharacterProperties";
import React from "react";
import CharacterDetails from "@/components/CharacterDetails";
import { BREAKPOINT } from "@/consts/breakpoints";
import CharacterCardShell from "./CharacterCardShell";
import { useBreakPoint } from "@/hooks/useBreakPoint";

const CARD_IMAGE_SIZE_DESKTOP = 100;
const CARD_IMAGE_SIZE_TABLET = 85;
const CARD_IMAGE_SIZE_MOBILE = 70;

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
  const [imageSize, setImageSize] = useState<number>(CARD_IMAGE_SIZE_MOBILE);
  const [showCharacterProperties, setShowCharacterProperties] = useState(true);
  const currentBreakPoint = useBreakPoint();

  useEffect(() => {
    if (!currentBreakPoint) return;

    switch (currentBreakPoint) {
      case BREAKPOINT.MOBILE:
        setImageSize(CARD_IMAGE_SIZE_MOBILE);
        setShowCharacterProperties(false);
        break;
      case BREAKPOINT.TABLET:
        setImageSize(CARD_IMAGE_SIZE_TABLET);
        setShowCharacterProperties(false);
        break;
      case BREAKPOINT.DESKTOP:
        setImageSize(CARD_IMAGE_SIZE_DESKTOP);
        setShowCharacterProperties(true);
    }
  }, [currentBreakPoint]);

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
        <CharacterAvatar
          src={image.src}
          alt={image.alt}
          size={imageSize}
          priority={id % 21 === 0}
        />
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
      {showCharacterProperties && (
        <Flex
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
      )}
    </CharacterCardShell>
  );
};

export default React.memo(CharacterCard);
