import { Flex, For } from "@chakra-ui/react";
import CharacterCard from "./CharacterCard";
import CharactersNoResult from "./CharactersNoResult";
import CharactersPagination from "./CharactersPagination";
import { IUseGetCharactersResponse } from "@/hooks/useGetCharacters";

const CharactersResults = ({
  data,
  showPagination,
  currentPage,
  navigateToPage,
}: {
  data: IUseGetCharactersResponse;
  showPagination: boolean;
  currentPage: number;
  navigateToPage: (page: number) => void;
}) => {
  return (
    <Flex padding={6} wrap={"wrap"} align="center" justify="center" gap={5}>
      <Flex
        gap={2}
        direction="row"
        wrap={"wrap"}
        align="center"
        justify="center"
      >
        <For each={data.characters.results} fallback={<CharactersNoResult />}>
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
      </Flex>
      {showPagination && (
        <CharactersPagination
          pageSize={20}
          count={data.characters.info.count}
          currentPage={currentPage}
          navigate={navigateToPage}
        />
      )}
    </Flex>
  );
};

export default CharactersResults;
