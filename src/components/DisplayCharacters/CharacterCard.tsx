import { Card, Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { useEffect, useState } from "react";
import CharacterAvatar from "./CharacterAvatar";
import CharacterProperties from "./CharacterProperties";
import React from "react";
import CharacterDetails from "../CharacterDetails";
import { BREAKPOINT, useBreakPoint } from "@/consts/breakpoints";

const CARD_DIMENSION_DESKTOP = 220;
const CARD_DIMENSION_TABLET = 160;
const CARD_DIMENSION_MOBILE = 150;
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
  const [cardDimension, setCardDimension] = useState(CARD_DIMENSION_DESKTOP);
  const [imageSize, setImageSize] = useState(CARD_IMAGE_SIZE_DESKTOP);
  const [showCharacterProperties, setShowCharacterProperties] = useState(true);
  const currentBreakPoint = useBreakPoint();

  useEffect(() => {
    if (currentBreakPoint) {
      if (currentBreakPoint === BREAKPOINT.MOBILE) {
        setCardDimension(CARD_DIMENSION_MOBILE);
        setImageSize(CARD_IMAGE_SIZE_MOBILE);
        setShowCharacterProperties(false);
      } else if (currentBreakPoint === BREAKPOINT.TABLET) {
        setCardDimension(CARD_DIMENSION_TABLET);
        setImageSize(CARD_IMAGE_SIZE_TABLET);
        setShowCharacterProperties(false);
      } else if (currentBreakPoint === BREAKPOINT.DESKTOP) {
        setCardDimension(CARD_DIMENSION_DESKTOP);
        setImageSize(CARD_IMAGE_SIZE_DESKTOP);
        setShowCharacterProperties(true);
      }
    }
  }, [currentBreakPoint]);

  return (
    <Card.Root width={cardDimension} height={cardDimension} overflow="hidden">
      <Flex
        padding={3}
        gap={2}
        direction={"column"}
        align="center"
        justify="center"
        position={"relative"}
      >
        <CharacterAvatar src={image.src} alt={image.alt} size={imageSize} />
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
    </Card.Root>
  );
};

export default React.memo(CharacterCard);
