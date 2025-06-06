import { Flex } from "@chakra-ui/react";

import React from "react";

const Chrome = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex width="100%" justify="center">
      <Flex width={1400} padding={3} gap={1} direction="column">
        {children}
      </Flex>
    </Flex>
  );
};

export default Chrome;
