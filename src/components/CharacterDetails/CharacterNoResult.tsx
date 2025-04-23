import { Box, Icon, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { CiCircleInfo as InfoIcon } from "react-icons/ci";

interface ICharactersNoResult {
  message?: string;
  suggestion?: string;
}

const CharacterNoResult: React.FC<ICharactersNoResult> = ({
  message = "No results found.",
  suggestion = "Try adjusting your id",
}) => {
  return (
    <Box
      w="full"
      py={10}
      px={6}
      borderWidth={1}
      borderRadius="lg"
      textAlign="center"
      bg="gray.50"
      boxShadow="sm"
    >
      <VStack gap={3}>
        <Icon as={InfoIcon} boxSize={6} color="gray.500" />
        <Text fontSize="lg" fontWeight="medium">
          {message}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {suggestion}
        </Text>
      </VStack>
    </Box>
  );
};

export default CharacterNoResult;
