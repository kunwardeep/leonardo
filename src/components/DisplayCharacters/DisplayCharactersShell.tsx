import { Flex } from "@chakra-ui/react";

const DisplayCharactersShell = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex gap={5} padding={2} direction={"column"} align={"center"}>
      {children}
    </Flex>
  );
};

export default DisplayCharactersShell;
