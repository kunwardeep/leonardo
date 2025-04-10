"use client";

import { BREAKPOINT } from "@/consts/";
import { useBreakPoint } from "@/hooks/useBreakPoint";
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
  page: number;
  navigate: (page: number) => void;
}

const CharactersPagination = ({
  pageSize,
  count,
  page,
  navigate,
}: ICharactersPagination) => {
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

  const handlePageChange = () => {
    return (e: { page: number }) => {
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
      onPageChange={handlePageChange()}
      paddingTop={5}
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
