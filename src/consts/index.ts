export const BREAKPOINT = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop",
};

export const LABEL = {
  USERNAME: "Username",
  JOB_TITLE: "Job Title",
};

export const DEFAULT_NUMBER_OF_CARDS = 20;

export const CLIENT_VALIDATION_MESSAGES = {
  USER_NAME: {
    IS_EMPTY: "Username is empty",
    TOO_SHORT: "Username must be at least 2 characters",
    TOO_LONG: "Username can't be more than 50 characters",
  },
  JOB_TITLE: {
    IS_EMPTY: "Job title is empty",
    TOO_SHORT: "Job title must be at least 3 characters",
    TOO_LONG: "Job title can't be more than 50 characters",
  },
};

export const PATHS = {
  BASE: "/",
  LOGIN: "/login",
  HOME: "/information",
  SETTINGS: "/settings",
};

export enum SearchFilter {
  NAME = "name",
  STATUS = "status",
  SPECIES = "species",
  GENDER = "gender",
  PAGE = "page",
}

export const VALIDATION_FIELDS = {
  USERNAME: "username",
  JOB_TITLE: "jobTitle",
};

export const COOKIE_NAME = {
  SESSION: "session",
};
