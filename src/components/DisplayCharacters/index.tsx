"use client";

import { useGetCharactersLazy } from "@/hooks/useGetCharacters";
import CharactersLoading from "./CharactersLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import AuthGuard from "@/components/Auth/AuthGuard";
import ErrorComponent from "@/components/ErrorComponent";
import CharactersResults from "./CharactersResult";
import DisplayCharactersShell from "./DisplayCharactersShell";

const DisplayCharacters = () => {
  return (
    <AuthGuard>
      <DisplayCharactersComponent />
    </AuthGuard>
  );
};

const getPageFromSearchParams = (searchParams: URLSearchParams) => {
  const page = searchParams.get("page");
  return page ? Number(page) || 1 : 1;
};

const DisplayCharactersComponent = () => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(getPageFromSearchParams(searchParams));
  const [showPagination, setShowPagination] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // const currentPage = getPageFromSearchParams(searchParams);
  const [fetchData, { loading: apiLoading, error, data }] =
    useGetCharactersLazy();

  const handleRefetch = () => {
    fetchData({ variables: { page: page } });
  };

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  const navigateToPage = (page: number) => {
    setPage(page);
    router.push(pathname + "?" + createQueryString("page", page));
  };

  useEffect(() => {
    fetchData({ variables: { page: page } });
  }, [fetchData, page]);

  useEffect(() => {
    if (data?.characters.info.count) {
      setShowPagination(true);
    }
  }, [data?.characters.info.count]);

  if (apiLoading) {
    return (
      <DisplayCharactersShell>
        <CharactersLoading />
      </DisplayCharactersShell>
    );
  }

  if (error) {
    return (
      <DisplayCharactersShell>
        <ErrorComponent
          message="Unable to load users"
          onRetry={handleRefetch}
        />
      </DisplayCharactersShell>
    );
  }

  if (data) {
    return (
      <DisplayCharactersShell>
        <CharactersResults
          data={data}
          showPagination={showPagination}
          page={page}
          navigateToPage={navigateToPage}
        />
      </DisplayCharactersShell>
    );
  }
};

export default React.memo(DisplayCharacters);
