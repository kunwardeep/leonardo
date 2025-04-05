import { useBreakpointValue } from "@chakra-ui/react";

export const BREAKPOINT = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop",
};

export const useBreakPoint = () => {
  return useBreakpointValue({
    base: BREAKPOINT.MOBILE,
    md: BREAKPOINT.TABLET,
    lg: BREAKPOINT.DESKTOP,
  });
};
