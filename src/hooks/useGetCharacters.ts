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
      }
    }
  }
`;

interface IUseCharacters {
  page: number;
}

const useGetCharacters = ({ page }: IUseCharacters) => {
  return useQuery(GET_CHARACTERS, { variables: { page } });
};

export default useGetCharacters;
