"use client";

import { useGetCharactersLazy } from "@/hooks/useGetCharacters";
import CharactersLoading from "./CharactersLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import AuthGuard from "@/components/Auth/AuthGuard";
import ErrorComponent from "@/components/ErrorComponent";
import CharactersResults from "./CharactersResult";

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
  const [isPending, startTransition] = useTransition();
  const [showPagination, setShowPagination] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = getPageFromSearchParams(searchParams);

  const [fetchData, { loading, error, data }] = useGetCharactersLazy();

  const handleRefetch = () => {
    fetchData({ variables: { page: currentPage } });
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
    startTransition(() => {
      router.push(pathname + "?" + createQueryString("page", page));
    });
  };

  useEffect(() => {
    fetchData({ variables: { page: currentPage } });
  }, [fetchData, currentPage]);

  useEffect(() => {
    if (data?.characters.info.count) {
      setShowPagination(true);
    }
  }, [data?.characters.info.count]);

  if (loading || isPending) {
    return <CharactersLoading />;
  }

  if (error) {
    return (
      <ErrorComponent message="Unable to load users" onRetry={handleRefetch} />
    );
  }

  if (data) {
    return (
      <CharactersResults
        data={data}
        showPagination={showPagination}
        currentPage={currentPage}
        navigateToPage={navigateToPage}
      />
    );
  }
};

export default React.memo(DisplayCharacters);
