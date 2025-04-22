"use client";

import { Field, Flex, Text, IconButton, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useFieldValidation } from "@/utils/authValidations";
import { useUser } from "@/components/Context/UserContext";
import { LuPencilLine, LuX, LuCheck } from "react-icons/lu";
import { LABEL, VALIDATION_FIELDS } from "@/consts/";
import React from "react";

interface IEditableField {
  fieldToValidate: string;
  currentValue: string;
  label: string;
  saveValue: (val: string) => Promise<boolean>;
}

const EditableInputField = ({
  label,
  fieldToValidate,
  currentValue,
  saveValue,
}: IEditableField) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(currentValue);
  const { errors, hasErrors } = useFieldValidation(fieldToValidate, value);
  const [error, setError] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setError(hasErrors ? errors[0] : null);
  }, [hasErrors, errors]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const showHideEditing = () => {
    setIsEditing(true);
  };

  const handleOnClear = () => {
    setValue(currentValue);
    setIsEditing(false);
  };

  const handleOnClick = async () => {
    if (!error) {
      const valuedSaved = await saveValue(value);
      if (valuedSaved) {
        setIsEditing(false);
      } else {
        setError("Unable to save");
      }
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Field.Root invalid={error ? true : false}>
      <Field.Label>
        <b>{label}</b>
      </Field.Label>
      <Flex align={"center"} gap={1}>
        {isEditing ? (
          <>
            <Input ref={inputRef} value={value} onChange={handleOnChange} />
            <IconButton variant="outline" size="xs" onClick={handleOnClear}>
              <LuX />
            </IconButton>
            <IconButton variant="outline" size="xs" onClick={handleOnClick}>
              <LuCheck />
            </IconButton>
          </>
        ) : (
          <>
            <Text textStyle="sm" padding={2}>
              {value}
            </Text>
            <IconButton variant="ghost" size="xs" onClick={showHideEditing}>
              <LuPencilLine />
            </IconButton>
          </>
        )}
      </Flex>

      <div style={{ minHeight: "24px" }}>
        <Field.ErrorText>{error}</Field.ErrorText>
      </div>
    </Field.Root>
  );
};

const UserSettings = () => {
  const { user, updateUsername, updateJobTitle } = useUser();

  return (
    user && (
      <Flex align="top" justify="center" padding={10} direction="column">
        <Text paddingBottom={10} textStyle="2xl">
          User Settings
        </Text>
        <EditableInputField
          fieldToValidate={VALIDATION_FIELDS.USERNAME}
          currentValue={user.username}
          label={LABEL.USERNAME}
          saveValue={updateUsername}
        />
        <EditableInputField
          fieldToValidate={VALIDATION_FIELDS.JOB_TITLE}
          currentValue={user.jobTitle}
          label={LABEL.JOB_TITLE}
          saveValue={updateJobTitle}
        />
      </Flex>
    )
  );
};

export default React.memo(UserSettings);
