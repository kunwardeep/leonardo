"use client";

import {
  ButtonGroup,
  IconButton,
  Pagination,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
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

  const currentSize = useBreakpointValue({
    base: "mobile",
    md: "tablet",
    lg: "desktop",
  });

  useEffect(() => {
    if (currentSize) {
      console.log("Breakpoint changed:", currentSize);
      if (currentSize === "mobile") {
        setSiblingCount(0);
        setButtonGroupSize("xs");
      } else if (currentSize === "tablet") {
        setSiblingCount(1);
        setButtonGroupSize("sm");
      } else if (currentSize === "desktop") {
        setSiblingCount(2);
        setButtonGroupSize("lg");
      }
    }
  }, [currentSize]);

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
