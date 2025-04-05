"use client";

import AuthGuard from "@/components/Auth/AuthGuard";
import useGetCharacters from "@/hooks/useGetCharacters";
import CharacterCard from "./CharacterCard";
import { Flex, For } from "@chakra-ui/react";
import CharactersLoading from "./CharactersLoading";
import CharactersError from "./CharactersError";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import CharactersPagination from "./CharactersPagination";
import CharactersNoResult from "./CharactersNoResult";

const DisplayCharacters = () => {
  return (
    <AuthGuard>
      <DisplayCharactersComponent />
    </AuthGuard>
  );
};

const DisplayCharactersComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);
  const { loading, data, error } = useGetCharacters({ page: currentPage });

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  const navigateToPage = (page: number) => {
    router.push(pathname + "?" + createQueryString("page", page));
  };

  if (loading) {
    return <CharactersLoading />;
  }

  if (error) {
    return <CharactersError />;
  }

  if (data) {
    return (
      <Flex padding={10} wrap={"wrap"} align="center" justify="center">
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
        {data.characters.info.count && (
          <CharactersPagination
            pageSize={20}
            count={data.characters.info.count}
            currentPage={currentPage}
            navigate={navigateToPage}
          />
        )}
      </Flex>
    );
  }
};

export default React.memo(DisplayCharacters);
