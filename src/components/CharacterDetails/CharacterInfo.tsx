import useGetCharacter from "@/hooks/useGetCharacter";
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Wrap,
  WrapItem,
  Heading,
} from "@chakra-ui/react";

import CharacterAvatar from "../DisplayCharacters/CharacterAvatar";
import ErrorComponent from "../ErrorComponent";
import CharacterDetailsLoading from "./CharacterDetailsLoading";
import CharacterNoResult from "./CharacterNoResult";

const CharacterInfo = ({ characterId }: { characterId: number }) => {
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

  if (!data?.character) {
    return <CharacterNoResult />;
  }

  if (data) {
    const character = data.character;
    return (
      <Box
        borderWidth="1px"
        borderRadius="2xl"
        boxShadow="lg"
        p={6}
        maxW="lg"
        bg="white"
        justifyContent="center"
        role="region"
        aria-labelledby="character-info-heading"
      >
        <VStack align="start">
          <HStack>
            <CharacterAvatar
              src={character.image}
              alt={`Portrait of ${character.name}`}
            />
            <Box>
              <Heading tabIndex={0} size="md" id="character-info-heading">
                {character.name}
              </Heading>
              <Text tabIndex={0} color="gray.500">
                {character.status}
              </Text>
              <Text tabIndex={0} fontSize="sm">
                {character.species} • {character.gender}
              </Text>
            </Box>
          </HStack>

          <Box>
            <Text tabIndex={0} fontWeight="semibold">
              Origin:
            </Text>
            <Text tabIndex={0}>
              {character.origin.name} ({character.origin.dimension})
            </Text>
          </Box>

          <Box>
            <Text tabIndex={0} fontWeight="semibold">
              Location:
            </Text>
            <Text tabIndex={0}>
              {character.location.name} ({character.location.dimension})
            </Text>
          </Box>

          <Box w="full">
            <Text tabIndex={0} fontWeight="semibold" mb={2}>
              Episodes:
            </Text>
            <Wrap>
              {character.episode.slice(0, 8).map((ep) => (
                <WrapItem key={ep.id}>
                  <Badge tabIndex={0} colorScheme="purple" fontSize="0.75em">
                    {ep.name}
                  </Badge>
                </WrapItem>
              ))}
              {character.episode.length > 8 && (
                <WrapItem>
                  <Badge tabIndex={0} variant="outline" colorScheme="gray">
                    +{character.episode.length - 8} more
                  </Badge>
                </WrapItem>
              )}
            </Wrap>
          </Box>
        </VStack>
      </Box>
    );
  }
};

export default CharacterInfo;
