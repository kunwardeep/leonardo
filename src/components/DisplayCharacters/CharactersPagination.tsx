"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface ICharactersPagination {
  pageSize: number;
  count: number;
  page: number;
  navigate: (page: number) => void;
}

const CharactersPagination = ({
  pageSize,
  count,
  page,
  navigate,
}: ICharactersPagination) => {
  const handlePageChange = () => {
    return (e: { page: number }) => {
      navigate(e.page);
    };
  };

  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={handlePageChange()}
      paddingTop={5}
      siblingCount={0}
    >
      <ButtonGroup
        attached
        variant="outline"
        size={{ base: "xs", md: "sm", lg: "lg" }}
      >
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton
              variant={{ base: "outline", _selected: "solid" }}
              zIndex={{ _selected: "1" }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default React.memo(CharactersPagination);
