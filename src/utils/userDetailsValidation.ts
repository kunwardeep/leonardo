import { CLIENT_VALIDATION_MESSAGES } from "@/consts/";
import { useMemo } from "react";
import { create, enforce, test } from "vest";

export const VALIDATION_FIELDS = {
  USERNAME: "username",
  JOB_TITLE: "jobTitle",
};

export const validationSuite = create((data = {}) => {
  if (VALIDATION_FIELDS.USERNAME in data) {
    const username = data.username?.trim();

    test(
      VALIDATION_FIELDS.USERNAME,
      CLIENT_VALIDATION_MESSAGES.USER_NAME.IS_EMPTY,
      () => {
        enforce(data.username?.trim()).isNotEmpty();
      },
      `${VALIDATION_FIELDS.USERNAME}_is_empty`
    );

    test(
      VALIDATION_FIELDS.USERNAME,
      CLIENT_VALIDATION_MESSAGES.USER_NAME.TOO_SHORT,
      () => {
        enforce(username).longerThanOrEquals(2);
      },
      `${VALIDATION_FIELDS.USERNAME}_too_short`
    );

    test(
      VALIDATION_FIELDS.USERNAME,
      CLIENT_VALIDATION_MESSAGES.USER_NAME.TOO_LONG,
      () => {
        enforce(username).shorterThanOrEquals(50);
      },
      `${VALIDATION_FIELDS.USERNAME}_too_long`
    );
  }

  if (VALIDATION_FIELDS.JOB_TITLE in data) {
    const jobTitle = data.jobTitle?.trim();

    test(
      VALIDATION_FIELDS.JOB_TITLE,
      CLIENT_VALIDATION_MESSAGES.JOB_TITLE.IS_EMPTY,
      () => {
        enforce(jobTitle).isNotEmpty();
      },
      `${VALIDATION_FIELDS.JOB_TITLE}_is_empty`
    );

    test(
      VALIDATION_FIELDS.JOB_TITLE,
      CLIENT_VALIDATION_MESSAGES.JOB_TITLE.TOO_SHORT,
      () => {
        enforce(jobTitle).longerThanOrEquals(3);
      },
      `${VALIDATION_FIELDS.JOB_TITLE}_too_short`
    );

    test(
      VALIDATION_FIELDS.JOB_TITLE,
      CLIENT_VALIDATION_MESSAGES.JOB_TITLE.TOO_LONG,
      () => {
        enforce(jobTitle).shorterThanOrEquals(50);
      },
      `${VALIDATION_FIELDS.JOB_TITLE}_too_long`
    );
  }
});

export const useFieldValidation = (fieldName: string, value: string) => {
  return useMemo(() => {
    const testData = { [fieldName]: value };
    const result = validationSuite(testData);

    return {
      errors: result.getErrors(fieldName),
      hasErrors: result.hasErrors(fieldName),
      isValid: !result.hasErrors(fieldName),
    };
  }, [fieldName, value]);
};
