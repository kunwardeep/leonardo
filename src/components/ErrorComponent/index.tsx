import { Box, VStack, Icon, Button, Text, Flex } from "@chakra-ui/react";
import { PiWarningOctagonThin as WarningIcon } from "react-icons/pi";

interface ICErrorComponent {
  message?: string;
  onRetry?: () => void;
}

const ErrorComponent = ({
  message = "Something went wrong!",
  onRetry,
}: ICErrorComponent) => {
  return (
    <Flex padding={10} align="center" justify="center">
      <Box
        borderWidth="1px"
        borderRadius="2xl"
        boxShadow="lg"
        p={6}
        maxW="lg"
        bg="red.50"
        borderColor="red.200"
      >
        <VStack gap={4} align="center">
          <Icon as={WarningIcon} w={8} h={8} color="red.400" />
          <Text fontSize="lg" fontWeight="bold" color="red.600">
            {message}
          </Text>
          {onRetry && (
            <Button colorScheme="red" variant="outline" onClick={onRetry}>
              Retry
            </Button>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default ErrorComponent;
