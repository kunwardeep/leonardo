import { Card } from "@chakra-ui/react";
import React from "react";

const CharacterCardShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card.Root
      overflow="hidden"
      width={[150, 150, 160, 220]}
      height={[150, 150, 160, 220]}
    >
      {children}
    </Card.Root>
  );
};

export default CharacterCardShell;
