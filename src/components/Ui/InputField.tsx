import { Field, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

interface IInputFieldWrapper {
  label: string;
  placeholder: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string;

  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
}

const InputField = ({
  label,
  placeholder,
  error,
  registration,
}: IInputFieldWrapper) => {
  const { onChange, onBlur, ref, name } = registration;
  const [placeHolderText, setPlaceHolderText] = useState(placeholder);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    if (placeHolderText === "") {
      setPlaceHolderText(placeholder);
    }
  };

  const handleOnClick = () => {
    if (placeHolderText === placeholder) {
      setPlaceHolderText("");
    }
  };

  return (
    <Field.Root invalid={error ? true : false}>
      <Field.Label>{label}</Field.Label>
      <Input
        {...registration}
        ref={ref}
        name={name}
        placeholder={placeHolderText}
        onBlur={handleOnBlur}
        onClick={handleOnClick}
        onChange={handleOnChange}
      />
      <div style={{ minHeight: "24px" }}>
        <Field.ErrorText>{error?.toString()}</Field.ErrorText>
      </div>
    </Field.Root>
  );
};

export default InputField;
