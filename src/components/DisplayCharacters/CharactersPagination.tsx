"use client";

import { BREAKPOINT, useBreakPoint } from "@/consts/breakpoints";
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const BTN_GROUP_SZ_DESKTOP = "lg";
const BTN_GROUP_SZ_TABLET = "sm";
const BTN_GROUP_SZ_MOBILE = "xs";

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
  const [buttonGroupSize, setButtonGroupSize] = useState<
    | typeof BTN_GROUP_SZ_MOBILE
    | typeof BTN_GROUP_SZ_TABLET
    | typeof BTN_GROUP_SZ_DESKTOP
  >();

  const currentBreakPoint = useBreakPoint();

  useEffect(() => {
    if (!currentBreakPoint) return;

    switch (currentBreakPoint) {
      case BREAKPOINT.MOBILE:
        setButtonGroupSize(BTN_GROUP_SZ_MOBILE);
        break;
      case BREAKPOINT.TABLET:
        setButtonGroupSize(BTN_GROUP_SZ_TABLET);
        break;
      case BREAKPOINT.DESKTOP:
        setButtonGroupSize(BTN_GROUP_SZ_DESKTOP);
        break;
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

  if (!buttonGroupSize) {
    return;
  }

  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={handlePageChange(setPage)}
      paddingTop={10}
      siblingCount={0}
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
