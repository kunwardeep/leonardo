import { Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { BREAKPOINT, useBreakPoint } from "@/consts/breakpoints";

const CARD_DIMENSION_DESKTOP = 220;
const CARD_DIMENSION_TABLET = 160;
const CARD_DIMENSION_MOBILE = 150;

const CharacterCardShell = ({ children }: { children: React.ReactNode }) => {
  const [cardDimension, setCardDimension] = useState<number>();
  const currentBreakPoint = useBreakPoint();

  useEffect(() => {
    if (!currentBreakPoint) return;

    switch (currentBreakPoint) {
      case BREAKPOINT.MOBILE:
        setCardDimension(CARD_DIMENSION_MOBILE);
        break;
      case BREAKPOINT.TABLET:
        setCardDimension(CARD_DIMENSION_TABLET);
        break;
      case BREAKPOINT.DESKTOP:
        setCardDimension(CARD_DIMENSION_DESKTOP);
    }
  }, [currentBreakPoint]);

  return (
    cardDimension && (
      <Card.Root width={cardDimension} height={cardDimension} overflow="hidden">
        {children}
      </Card.Root>
    )
  );
};

export default React.memo(CharacterCardShell);
