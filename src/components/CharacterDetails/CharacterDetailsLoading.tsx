import { Box, VStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const CharacterDetailsLoading = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      boxShadow="lg"
      p={6}
      maxW="lg"
      bg="white"
    >
      <VStack gap={4} align="start">
        <Box display="flex" alignItems="center" gap={4}>
          <SkeletonCircle size="20" />
          <Box>
            <SkeletonText noOfLines={2} gap="2" w="40" />
          </Box>
        </Box>

        <SkeletonText noOfLines={2} gap="2" w="full" />
        <SkeletonText noOfLines={2} gap="2" w="full" />

        <Box w="full">
          <SkeletonText noOfLines={2} gap="2" w="full" />
        </Box>
      </VStack>
    </Box>
  );
};

export default CharacterDetailsLoading;
