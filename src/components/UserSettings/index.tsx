"use client";

import { Field, Flex, Text, IconButton, Input } from "@chakra-ui/react";
import AuthGuard from "../Auth/AuthGuard";
import { useEffect, useState } from "react";
import {
  useFieldValidation,
  VALIDATION_FIELDS,
} from "@/utils/userDetailsValidation";
import { useUser } from "../Context/UserContext";
import { LuPencilLine, LuX, LuCheck } from "react-icons/lu";
import { LABEL } from "@/consts/fieldLabel";
import React from "react";

interface IEditableField {
  fieldToValidate: string;
  currentValue: string;
  label: string;
  saveValue: (val: string) => boolean;
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

  const handleOnClick = () => {
    if (!error) {
      const valuedSaved = saveValue(value);
      if (valuedSaved) {
        setIsEditing(false);
      } else {
        setError("Unable to save");
      }
    }
  };

  return (
    <Field.Root invalid={error ? true : false}>
      <Field.Label>
        <b>{label}</b>
      </Field.Label>
      <Flex align={"center"} gap={1}>
        {isEditing ? (
          <>
            <Input value={value} onChange={handleOnChange} />
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
  const { user, fetchUser, setUser } = useUser();
  const saveUserName = (val: string) => {
    const savedUser = fetchUser();
    if (savedUser) {
      savedUser.username = val;
      setUser(savedUser);
      return true;
    } else {
      return false;
    }
  };

  const saveJobTitle = (val: string) => {
    const savedUser = fetchUser();
    if (savedUser) {
      savedUser.jobTitle = val;
      setUser(savedUser);
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthGuard>
      {user && (
        <Flex align="top" justify="center" padding={10} direction="column">
          <Text paddingBottom={10} textStyle="2xl">
            User Settings
          </Text>
          <EditableInputField
            fieldToValidate={VALIDATION_FIELDS.USERNAME}
            currentValue={user.username}
            label={LABEL.USERNAME}
            saveValue={saveUserName}
          />
          <EditableInputField
            fieldToValidate={VALIDATION_FIELDS.JOB_TITLE}
            currentValue={user.jobTitle}
            label={LABEL.JOB_TITLE}
            saveValue={saveJobTitle}
          />
        </Flex>
      )}
    </AuthGuard>
  );
};

export default React.memo(UserSettings);
