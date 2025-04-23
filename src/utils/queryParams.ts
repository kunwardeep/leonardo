import { SearchPageParam, SearchFilter } from "@/consts";
import { IUseCharacters } from "@/hooks/useGetCharacters";
import { IState } from "@/hooks/useQueryVariableReducer";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getPageNumber = (params: URLSearchParams) => {
  const rawPageParam = params.get(SearchPageParam.PAGE);
  const pageNumber = rawPageParam ? Number(rawPageParam) || 1 : 1;
  return pageNumber < 1 ? 1 : pageNumber;
};

export const getInitialState = (
  readOnlySearchParams: ReadonlyURLSearchParams
): IState => {
  const params = new URLSearchParams(readOnlySearchParams.toString());

  const filter: IUseCharacters["filter"] = {};

  Object.values(SearchFilter).forEach((key) => {
    const value = params.get(key);
    if (value) {
      filter[key] = value;
    }
  });

  return {
    page: getPageNumber(params),
    filter,
  };
};

export const createQueryString = ({
  page,
  filter = {},
}: IUseCharacters): string => {
  const searchParams = new URLSearchParams();

  searchParams.set(SearchPageParam.PAGE, page.toString());

  Object.entries(filter).forEach(([key, value]) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      searchParams.set(key, trimmedValue);
    }
  });

  return searchParams.toString();
};
