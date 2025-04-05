"use client";

import { Flex } from "@chakra-ui/react";
import Header from "../Header";

import React from "react";

const Chrome = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex width="100%" justify="center">
      <Flex width={1200} padding={3} gap={1} direction="column">
        <Header />
        {children}
      </Flex>
    </Flex>
  );
};

export default React.memo(Chrome);
