import { Flex, For, Skeleton } from "@chakra-ui/react";
import React from "react";
import CharacterCardShell from "./CharacterCardShell";

const CharactersLoading = () => {
  return (
    <Flex padding={6} wrap={"wrap"} align="center" justify="center">
      <Flex
        gap={2}
        direction="row"
        wrap={"wrap"}
        align="center"
        justify="center"
      >
        <For each={Array.from({ length: 20 }, (_, i) => i + 1)}>
          {(item) => (
            <CharacterCardShell key={item}>
              <Skeleton height={"full"} />
            </CharacterCardShell>
          )}
        </For>
      </Flex>
    </Flex>
  );
};

export default React.memo(CharactersLoading);
