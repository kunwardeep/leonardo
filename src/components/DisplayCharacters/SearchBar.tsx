import { Flex } from "@chakra-ui/react";
import SearchField from "../Ui/SearchField";
import { useCallback } from "react";
import { SearchFilter } from "@/consts/";

interface ISearchBar {
  searchFn: (val: string, filter: SearchFilter) => void;
  searchFunctionality: {
    name?: { defaultValue: string };
    status?: { defaultValue: string };
    species?: { defaultValue: string };
    gender?: { defaultValue: string };
  };
}

interface ISearchField {
  searchFn: (val: string, filter: SearchFilter) => void;
  defaultValue: string;
}

const NameSearch = ({ searchFn, defaultValue }: ISearchField) => {
  const handleSearch = useCallback(
    (val: string) => {
      searchFn(val, SearchFilter.NAME);
    },
    [searchFn]
  );

  return (
    <SearchField
      placeholder={"Search by name"}
      searchFn={handleSearch}
      defaultValue={defaultValue}
    />
  );
};

const StatusSearch = ({ searchFn, defaultValue }: ISearchField) => {
  const handleSearch = useCallback(
    (val: string) => {
      searchFn(val, SearchFilter.STATUS);
    },
    [searchFn]
  );

  return (
    <SearchField
      placeholder={"Search by status"}
      searchFn={handleSearch}
      defaultValue={defaultValue}
    />
  );
};

const SpeciesSearch = ({ searchFn, defaultValue }: ISearchField) => {
  const handleSearch = useCallback(
    (val: string) => {
      searchFn(val, SearchFilter.SPECIES);
    },
    [searchFn]
  );

  return (
    <SearchField
      placeholder={"Search by species"}
      searchFn={handleSearch}
      defaultValue={defaultValue}
    />
  );
};

const GenderSearch = ({ searchFn, defaultValue }: ISearchField) => {
  const handleSearch = useCallback(
    (val: string) => {
      searchFn(val, SearchFilter.GENDER);
    },
    [searchFn]
  );

  return (
    <SearchField
      placeholder={"Search by gender"}
      searchFn={handleSearch}
      defaultValue={defaultValue}
    />
  );
};

const SearchBar = ({ searchFn, searchFunctionality }: ISearchBar) => {
  return (
    <Flex
      width={"90%"}
      gap={3}
      justify={"center"}
      zIndex={2}
      wrap={{ base: "wrap", lg: "nowrap" }}
    >
      {searchFunctionality.name && (
        <NameSearch
          searchFn={searchFn}
          defaultValue={searchFunctionality.name.defaultValue}
        />
      )}
      {searchFunctionality.status && (
        <StatusSearch
          searchFn={searchFn}
          defaultValue={searchFunctionality.status.defaultValue}
        />
      )}
      {searchFunctionality.species && (
        <SpeciesSearch
          searchFn={searchFn}
          defaultValue={searchFunctionality.species.defaultValue}
        />
      )}
      {searchFunctionality.gender && (
        <GenderSearch
          searchFn={searchFn}
          defaultValue={searchFunctionality.gender.defaultValue}
        />
      )}
    </Flex>
  );
};

export default SearchBar;
