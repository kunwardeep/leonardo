import { gql, useQuery } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
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

interface IUseCharacters {
  page: number;
}

interface IUseGetCharactersResponse {
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

const useGetCharacters = ({ page }: IUseCharacters) => {
  return useQuery<IUseGetCharactersResponse>(GET_CHARACTERS, {
    variables: { page },
  });
};

export default useGetCharacters;
