import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = process.browser
  ? new WebSocketLink({
      uri: "ws://localhost:9000/subscriptions",
      options: {
        reconnect: true,
      },
    })
  : null;

const httpLink = new HttpLink({
  uri: "http://localhost:9000/graphql",
  credentials: "include",
});

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink!,
      httpLink
    )
  : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  credentials: "include",
  ssrMode: false,
});
