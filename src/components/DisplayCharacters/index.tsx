"use client";

import AuthGuard from "@/components/Auth/AuthGuard";
import useGetCharacters from "@/hooks/useGetCharacters";
import CharacterCard from "./CharacterCard";
import { Flex, For, Stack } from "@chakra-ui/react";

const DisplayCharacters = () => {
  return (
    <AuthGuard>
      <DisplayCharactersComponent />
    </AuthGuard>
  );
};

const DisplayCharactersComponent = () => {
  const { loading, data, error } = useGetCharacters({ page: 1 });

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  if (data) {
    return (
      <Flex padding={3} gap="1" align="center" justify="center">
        <Stack
          maxW={1040}
          direction="row"
          wrap={"wrap"}
          align="center"
          justify="center"
        >
          <For each={data.characters.results}>
            {(item) => (
              <CharacterCard
                key={item.id}
                id={item.id}
                species={item.species}
                status={item.status}
                gender={item.gender}
                image={{
                  src: item.image,
                  alt: `Image of character ${item.name}`,
                }}
                name={item.name}
              />
            )}
          </For>
        </Stack>
      </Flex>
    );
  }
};

export default DisplayCharacters;
