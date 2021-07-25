import {
  ApolloClient,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

import { InMemoryCache } from "@apollo/client/cache";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("github_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export function createApolloClient(
  token: string
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink.concat(authLink),
  });
}
