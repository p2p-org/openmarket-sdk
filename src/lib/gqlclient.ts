import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import {
  ApolloClient,
  ApolloQueryResult,
  // MutationOptions,
  OperationVariables,
  QueryOptions,
  // SubscriptionOptions
} from 'apollo-client'
// import {Observable} from "apollo-client/util/Observable";
import {
  // FetchResult,
  split,
} from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import 'isomorphic-unfetch'
import ws from 'ws'
import { OpenMarketGQLConfig } from '../types'

// tslint:disable-next-line:variable-name
const _global = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {}

// Create a WebSocket link
const wsLink = (uri: string) =>
  new WebSocketLink({
    options: {
      reconnect: true,
    },
    uri,
    // @ts-ignore
    webSocketImpl: _global.WebSocket || _global.MozWebSocket ? null : ws,
  })

// Create an http link
const httpLink = (uri: string, accessKey?: string) =>
  new HttpLink({
    credentials: 'include',
    fetch,
    headers: {
      'X-Hasura-Access-Key': accessKey,
    },
    uri,
  })

const link = (wsUri: string, httpUri: string, accessKey?: string) =>
  split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)

      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink(wsUri),
    httpLink(httpUri, accessKey)
  )

// const authMiddleware = new ApolloLink((operation, forward) => {
//   if (accessToken) {
//     // add the authorization to the headers
//     operation.setContext({
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//   }
//   return forward(operation)
// })

export class GQLClient {
  public readonly client: ApolloClient<NormalizedCacheObject>

  /**
   * Logger function to use when debugging
   */
  public readonly logger: (arg: string) => void

  /**
   * Create an instance of the Market API
   * @param config GraphQL config
   * @param logger Optional function for logging debug strings before and after requests are made
   */
  // constructor(httpEndpoint: string, wsEndpoint?: string, logger?: (arg: string) => void) {
  constructor(config: OpenMarketGQLConfig, logger?: (arg: string) => void) {
    this.client = new ApolloClient({
      cache: new InMemoryCache({
        addTypename: false,
      }),
      connectToDevTools: true,
      link: config.wsEndpoint
        ? link(config.wsEndpoint, config.httpEndpoint, config.accessKey)
        : httpLink(config.httpEndpoint, config.accessKey), // concat(authMiddleware, link(wsEndpoint, httpEndpoint)),
    })

    // Debugging: default to nothing
    this.logger = logger || ((arg: string) => arg)
  }
  // query<T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables>): Promise<ApolloQueryResult<T>>;
  // mutate<T = any, TVariables = OperationVariables>(options: MutationOptions<T, TVariables>): Promise<FetchResult<T>>;
  // subscribe<T = any, TVariables = OperationVariables>(options: SubscriptionOptions<TVariables>): Observable<FetchResult<T>>;

  public async query<T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables>
  ): Promise<ApolloQueryResult<T>> {
    // tslint:disable-next-line:no-console
    // console.log(options)
    const res = await this.client.query(options)
    // tslint:disable-next-line:no-console
    // console.log(res)
    return res
  }
  // public mutate<T = any, TVariables = OperationVariables>(options: MutationOptions<TVariables>): Promise<FetchResult<T>> {
  //  return this.client.mutate(options)
  // }
  // public subscribe<T = any, TVariables = OperationVariables>(options: SubscriptionOptions<TVariables>): Observable<FetchResult<T>> {
  //  return this.client.subscribe(options)
  // }
}
