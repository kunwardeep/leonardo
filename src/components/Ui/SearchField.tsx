"use client";

import {
  CloseButton as ClearButton,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SearchFunctionType = (val: string) => void;
interface ISearchField {
  placeholder: string;
  searchFn: SearchFunctionType;
  debounceTime?: number;
  defaultValue: string;
}

const DEFAULT_DEBOUNCE_TIME = 500;

const debounce = (searchFn: SearchFunctionType, debounceTime: number) => {
  let timeout: NodeJS.Timeout | undefined;

  return (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchFn(value);
    }, debounceTime);
  };
};

const SearchField = ({
  placeholder,
  searchFn,
  debounceTime = DEFAULT_DEBOUNCE_TIME,
  defaultValue,
}: ISearchField) => {
  const [value, setValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useMemo(
    () => debounce(searchFn, debounceTime),
    [searchFn, debounceTime]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      debouncedSearch(e.currentTarget.value);
    },
    [debouncedSearch]
  );

  const handleClearInput = useCallback(() => {
    setValue("");
    // no need for debouncing here
    searchFn("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <InputGroup
      endElement={
        <ClearButton
          aria-label="Clear search input"
          hidden={!value ? true : false}
          size="xs"
          me={-2}
          onClick={handleClearInput}
        />
      }
    >
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </InputGroup>
  );
};

export default SearchField;
