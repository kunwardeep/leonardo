"use client";

import useGetCharacters, { IUseCharacters } from "@/hooks/useGetCharacters";
import CharactersLoading from "./CharactersLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ErrorComponent from "@/components/ErrorComponent";
import CharactersResults from "./CharactersResult";
import DisplayCharactersShell from "./DisplayCharactersShell";
import SearchBar from "./SearchBar";
import useQueryVariableReducer from "@/hooks/useQueryVariableReducer";
import { SearchFilter } from "@/consts";
import {
  createQueryString,
  getInitialState,
  getPageNumber,
} from "@/utils/queryParams";

const DisplayCharacters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const readOnlySearchParams = useSearchParams();
  const {
    state,
    updateGenderFilter,
    updateNameFilter,
    updatePage,
    updateSpeciesFilter,
    updateStatusFilter,
  } = useQueryVariableReducer(getInitialState(readOnlySearchParams));

  const { loading: apiLoading, error, data, refetch } = useGetCharacters(state);
  const navigationRef = useRef(false);

  const updateUrl = useCallback(
    (queryVariables: IUseCharacters) => {
      const pathQuery: string = createQueryString(queryVariables);
      router.push(`${pathname}?${pathQuery}`);
    },
    [pathname, router]
  );

  const navigateToPage = useCallback(
    (page: number) => {
      navigationRef.current = true;

      updatePage(page);
      updateUrl({ ...state, page });
    },
    [state, updatePage, updateUrl]
  );

  const filterUpdaters: Record<SearchFilter, (val: string) => void> =
    useMemo(() => {
      return {
        [SearchFilter.NAME]: updateNameFilter,
        [SearchFilter.STATUS]: updateStatusFilter,
        [SearchFilter.SPECIES]: updateSpeciesFilter,
        [SearchFilter.GENDER]: updateGenderFilter,
      };
    }, [
      updateNameFilter,
      updateStatusFilter,
      updateSpeciesFilter,
      updateGenderFilter,
    ]);

  const handleSearch = useCallback(
    (value: string, filter: SearchFilter) => {
      navigationRef.current = true;
      const trimmedValue = value.trim();
      const updateFilter = filterUpdaters[filter];
      updatePage(1);
      updateFilter(trimmedValue);
      updateUrl({
        page: 1,
        filter: { ...state.filter, [filter.toLowerCase()]: trimmedValue },
      });
    },
    [filterUpdaters, updateUrl, updatePage, state]
  );

  useEffect(() => {
    // handle url changes outside of the component
    // /back/fwd
    const navigatedManually = !navigationRef.current;

    if (navigatedManually) {
      const params = new URLSearchParams(readOnlySearchParams.toString());

      updatePage(getPageNumber(params));

      Object.entries(filterUpdaters).forEach(([key, updatedFn]) => {
        updatedFn(params.get(key) || "");
      });
    }
    navigationRef.current = false;
  }, [readOnlySearchParams, filterUpdaters, updatePage]);

  return (
    <DisplayCharactersShell>
      <SearchBar
        searchFn={handleSearch}
        searchFunctionality={{
          name: { defaultValue: state.filter?.name || "" },
          status: { defaultValue: state.filter?.status || "" },
          species: { defaultValue: state.filter?.species || "" },
          gender: { defaultValue: state.filter?.gender || "" },
        }}
      />
      {apiLoading && <CharactersLoading />}
      {error && (
        <ErrorComponent message="Unable to load users" onRetry={refetch} />
      )}
      {data && (
        <CharactersResults
          data={data}
          page={state.page}
          navigateToPage={navigateToPage}
        />
      )}
    </DisplayCharactersShell>
  );
};

export default DisplayCharacters;
