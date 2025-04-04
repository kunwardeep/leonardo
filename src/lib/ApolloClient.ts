import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphQlClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default graphQlClient;
