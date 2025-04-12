"use client";

import { IUseCharacters, useGetCharactersLazy } from "@/hooks/useGetCharacters";
import CharactersLoading from "./CharactersLoading";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import AuthGuard from "@/components/Auth/AuthGuard";
import ErrorComponent from "@/components/ErrorComponent";
import CharactersResults from "./CharactersResult";
import DisplayCharactersShell from "./DisplayCharactersShell";
import useQueryVariableReducer, {
  IState,
  updateGenderFilter,
  updateNameFilter,
  updatePage,
  updateSpeciesFilter,
  updateStatusFilter,
} from "@/hooks/useQueryVariableReducer";
import { SearchFilter } from "@/consts";

const DisplayCharacters = () => {
  return (
    <AuthGuard>
      <DisplayCharactersComponent />
    </AuthGuard>
  );
};

const getPageNumber = (params: URLSearchParams) => {
  const rawPageParam = params.get(SearchFilter.PAGE);
  const pageNumber = rawPageParam ? Number(rawPageParam) || 1 : 1;
  return pageNumber < 1 ? 1 : pageNumber;
};

const getInitialState = (
  readOnlySearchParams: ReadonlyURLSearchParams
): IState => {
  const params = new URLSearchParams(readOnlySearchParams.toString());
  const species = params.get(SearchFilter.SPECIES) ?? undefined;
  const gender = params.get(SearchFilter.GENDER) ?? undefined;
  const name = params.get(SearchFilter.NAME) ?? undefined;
  const status = params.get(SearchFilter.STATUS) ?? undefined;

  return {
    page: getPageNumber(params),
    filter: {
      name: name,
      species: species,
      gender: gender,
      status: status,
    },
  };
};

const createQueryString = (queryVariables: IUseCharacters) => {
  const searchParams = new URLSearchParams();
  const page = queryVariables.page;
  const filter = queryVariables.filter;

  searchParams.set(SearchFilter.PAGE, page as unknown as string);

  if (filter) {
    if (filter.name) {
      searchParams.set(SearchFilter.NAME, filter.name);
    }
    if (filter.status) {
      searchParams.set(SearchFilter.STATUS, filter.status);
    }
    if (filter.species) {
      searchParams.set(SearchFilter.SPECIES, filter.species);
    }
    if (filter.gender) {
      searchParams.set(SearchFilter.GENDER, filter.gender);
    }
  }

  return searchParams.toString();
};

const DisplayCharactersComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const readOnlySearchParams = useSearchParams();
  const [fetchData, { loading: apiLoading, error, data }] =
    useGetCharactersLazy();
  const navigationRef = useRef(false);

  const showPagination = useMemo(() => {
    const count = data?.characters?.info?.count;
    return Boolean(count && count > 20);
  }, [data]);

  const [state, dispatch] = useQueryVariableReducer(
    getInitialState(readOnlySearchParams)
  );

  const currentPage = state.page;
  const pathQuery: string = createQueryString(state);

  const handleFetch = useCallback(() => {
    navigationRef.current = true;
    fetchData({ variables: state });
  }, [fetchData, state]);

  const navigateToPage = useCallback(
    (page: number) => {
      updatePage(dispatch, page);
    },
    [dispatch]
  );

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  useEffect(() => {
    router.push(`${pathname}?${pathQuery}`);
  }, [router, pathname, pathQuery]);

  useEffect(() => {
    // handle url changes outside of the component
    // /back/fwd
    const params = new URLSearchParams(readOnlySearchParams.toString());

    if (!navigationRef.current && params.toString() !== pathQuery) {
      const page = getPageNumber(params);
      const name = params.get(SearchFilter.NAME);
      const status = params.get(SearchFilter.STATUS);
      const species = params.get(SearchFilter.SPECIES);
      const gender = params.get(SearchFilter.GENDER);

      updatePage(dispatch, page);
      updateNameFilter(dispatch, name || "");
      updateStatusFilter(dispatch, status || "");
      updateSpeciesFilter(dispatch, species || "");
      updateGenderFilter(dispatch, gender || "");
    }

    navigationRef.current = false;
  }, [dispatch, readOnlySearchParams, pathQuery]);

  return (
    <DisplayCharactersShell>
      {apiLoading && <CharactersLoading />}
      {error && (
        <ErrorComponent message="Unable to load users" onRetry={handleFetch} />
      )}
      {data && (
        <CharactersResults
          data={data}
          showPagination={showPagination}
          page={currentPage}
          navigateToPage={navigateToPage}
        />
      )}
    </DisplayCharactersShell>
  );
};

export default React.memo(DisplayCharacters);
