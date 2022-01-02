import { dedupExchange, fetchExchange, RequestPolicy } from "@urql/core";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
  LogoutMutation,
  NavbarQueryQuery,
  NavbarQueryDocument,
} from "../generated/graphql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import { isServer } from "./isServer";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: any, q: any) => any
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";

  if (isServer()) {
    cookie = ctx?.req.headers.cookie;
  }

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },

    exchanges: [
      dedupExchange,
      ,
      cacheExchange({
        keys: {
          NavbarResponse: () => null,
        },
        resolvers: {
          Query: {
            searchSkills: simplePagination({
              limitArgument: "limit",
              offsetArgument: "skip",
            }),
            commentsByWorker: simplePagination(),
          },
        },
        updates: {
          Mutation: {
            addProfilePicture: (_result, args, cache, info) => {
              cache.invalidate("query", "workerById", {});
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, NavbarQueryQuery>(
                cache,
                { query: NavbarQueryDocument },
                _result,
                () => ({ navbarQuery: null })
              );
              // cache.invalidate("query", "NavbarQuery", {});
            },
            sendMessage: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "getConversation"
              );
              fieldInfos.forEach((fi) => {
                cache.invalidate(
                  "Query",
                  "getConversation",
                  fi.arguments || {}
                );
              });
            },
          },
        },
        Queries: {},
      }),
      ssrExchange,
      fetchExchange,
    ],
    requestPolicy: "network-only" as RequestPolicy | undefined,
  };
};
