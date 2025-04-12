import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
        count
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        gender
      }
    }
  }
`;

export interface ISearchFilter {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export interface IUseCharacters {
  page: number;
  filter?: ISearchFilter;
}

export interface IUseGetCharactersResponse {
  characters: {
    info: {
      pages: number;
      count: number;
      next: number | null;
      prev: number | null;
    };

    results: Array<{
      id: number;
      name: string;
      image: string;
      status: string;
      species: string;
      gender: string;
    }>;
  };
}

const useGetCharacters = ({ page, filter }: IUseCharacters) => {
  return useQuery<IUseGetCharactersResponse>(GET_CHARACTERS, {
    variables: { page, filter },
    notifyOnNetworkStatusChange: true,
  });
};

export const useGetCharactersLazy = () => {
  return useLazyQuery<IUseGetCharactersResponse>(GET_CHARACTERS, {
    notifyOnNetworkStatusChange: true,
  });
};

export default useGetCharacters;
