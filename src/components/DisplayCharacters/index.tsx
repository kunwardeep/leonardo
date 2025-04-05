"use client";

import useGetCharacters from "@/hooks/useGetCharacters";
import CharacterCard from "./CharacterCard";
import { Flex, For } from "@chakra-ui/react";
import CharactersLoading from "./CharactersLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import CharactersPagination from "./CharactersPagination";
import CharactersNoResult from "./CharactersNoResult";
import AuthGuard from "@/components/Auth/AuthGuard";
import ErrorComponent from "@/components/ErrorComponent";

const DisplayCharacters = () => {
  return (
    <AuthGuard>
      <DisplayCharactersComponent />
    </AuthGuard>
  );
};

const DisplayCharactersComponent = () => {
  const [showPagination, setShowPagination] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || 1);
  const { loading, data, error, refetch } = useGetCharacters({
    page: currentPage,
  });

  const handleRefetch = () => {
    refetch();
  };

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

  useEffect(() => {
    if (data?.characters.info.count) {
      setShowPagination(true);
    }
  }, [data?.characters.info.count]);

  if (loading) {
    return <CharactersLoading />;
  }

  if (error) {
    return (
      <ErrorComponent message="Unable to load users" onRetry={handleRefetch} />
    );
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
  }
};

export default React.memo(DisplayCharacters);
