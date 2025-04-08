import { Flex, HStack, ProgressCircle } from "@chakra-ui/react";

const loading = () => {
  return (
    <Flex padding={10} wrap={"wrap"} align="center" justify="center">
      <HStack gap="10">
        <ProgressCircle.Root size={"xl"} value={30}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range strokeLinecap="round" />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </HStack>
    </Flex>
  );
};

export default loading;
