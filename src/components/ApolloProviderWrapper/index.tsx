"use client";

import graphQlClient from "@/lib/ApolloClient";
import { ApolloProvider } from "@apollo/client";

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={graphQlClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
