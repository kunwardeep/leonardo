import { gql, useQuery } from "@apollo/client";

const GET_CHARACTER = gql`
  query GetCharacters($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
      }
      location {
        name
        dimension
      }
      image
      episode {
        id
        name
      }
    }
  }
`;

export interface ICharacter {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
    dimension: string;
  };
  location: {
    name: string;
    dimension: string;
  };
  episode: Array<{
    id: string;
    name: string;
  }>;
}

interface IUseGetCharacterResponse {
  character: ICharacter;
}

interface IUseCharacter {
  id: number;
}

const useGetCharacter = ({ id }: IUseCharacter) => {
  return useQuery<IUseGetCharacterResponse>(GET_CHARACTER, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });
};

export default useGetCharacter;
