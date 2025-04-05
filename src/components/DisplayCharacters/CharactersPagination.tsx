"use client";

import { BREAKPOINT, useBreakPoint } from "@/consts/breakpoints";
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface ICharactersPagination {
  pageSize: number;
  count: number;
  currentPage: number;
  navigate: (page: number) => void;
}

const CharactersPagination = ({
  pageSize,
  count,
  currentPage,
  navigate,
}: ICharactersPagination) => {
  const [page, setPage] = useState(currentPage);
  const [siblingCount, setSiblingCount] = useState(2);
  const [buttonGroupSize, setButtonGroupSize] = useState<"xs" | "sm" | "lg">(
    "lg"
  );
  const currentBreakPoint = useBreakPoint();

  useEffect(() => {
    if (currentBreakPoint) {
      if (currentBreakPoint === BREAKPOINT.MOBILE) {
        setSiblingCount(0);
        setButtonGroupSize("xs");
      } else if (currentBreakPoint === BREAKPOINT.TABLET) {
        setSiblingCount(1);
        setButtonGroupSize("sm");
      } else if (currentBreakPoint === BREAKPOINT.DESKTOP) {
        setSiblingCount(2);
        setButtonGroupSize("lg");
      }
    }
  }, [currentBreakPoint]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    return (e: { page: number }) => {
      setPage(e.page);
      navigate(e.page);
    };
  };

  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={handlePageChange(setPage)}
      paddingTop={10}
      siblingCount={siblingCount}
    >
      <ButtonGroup attached variant="outline" size={buttonGroupSize}>
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
