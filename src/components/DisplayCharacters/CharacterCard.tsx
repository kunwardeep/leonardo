import { Card, Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ChakraUi/tooltip";
import { useEffect, useRef, useState } from "react";
import CharacterAvatar from "./CharacterAvatar";
import CharacterProperties from "./CharacterProperties";

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
  image,
  name,
  status,
  species,
  gender,
}: ICharacterCard) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const textIsTruncated =
      (textRef.current?.scrollHeight ?? 0) >
      (textRef.current?.clientHeight ?? 0);

    setIsTruncated(textIsTruncated);
  }, []);

  return (
    <Card.Root width={200} height={200} overflow="hidden">
      <Flex
        padding={3}
        gap={2}
        direction={"column"}
        align="center"
        justify="center"
      >
        <CharacterAvatar src={image.src} alt={image.alt} />
        <Tooltip
          aria-label={`Full name: ${name}`}
          content={name}
          disabled={!isTruncated}
          showArrow
          positioning={{ placement: "top" }}
        >
          <Text
            ref={textRef}
            padding={1}
            truncate
            fontWeight="semibold"
            lineClamp="1"
            textAlign={"center"}
          >
            {name}
          </Text>
        </Tooltip>
        <CharacterProperties
          status={status}
          species={species}
          gender={gender}
        />
      </Flex>
    </Card.Root>
  );
};

export default CharacterCard;
