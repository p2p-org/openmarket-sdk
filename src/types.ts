import {FetchPolicy} from "apollo-client";

export enum Network {
  Main = 'main',
  Rinkeby = 'rinkeby',
}

export enum MarketStatus {
  Default = 0,
  Market = 1,
  Auction = 2,
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

/**
 * Market API configuration object
 * @param apiKey Optional key to use for API
 * @param networkName `Network` type to use. Defaults to `Network.Main` (mainnet)
 * @param apiBaseUrl Optional base URL to use for the API
 */
export interface DGMarketAPIConfig {
  readonly networkName?: Network
  readonly apiKey?: string
  readonly apiBaseUrl?: string
  readonly gqlHttpUrl: string
  readonly gqlWsUrl?: string
  readonly fetchPolicy?: FetchPolicy
}

export interface DGTxConfig {
  readonly lcdUrl: string
  readonly chainId: string
  readonly path?: string
  readonly bech32MainPrefix?: string
}

export interface TxMessageParams {
  // readonly type: string
  // readonly msg: string
  // readonly fee: string
  readonly [key: string]: any
}

export interface DGMarketGQLConfig {
  readonly httpEndpoint?: string
  readonly wsEndpoint?: string
}

export interface DGProvider {
  readonly networkName?: Network
}

export interface DGMarketQueryNFTParams {
  // $token_id: String, $status: Int, $offset: Int, $limit: Int, $owner: String, $ordPrice: order_by = asc, $ordStatus: order_by = asc, $minPrice: String, $maxPrice: String
  readonly tokenId?: string
  readonly status?: MarketStatus
  readonly owner?: string
  readonly limit?: number
  readonly offset?: number
  readonly orderPrice?: SortOrder
  readonly orderStatus?: SortOrder
  readonly minPrice?: string
  readonly maxPrice?: string
}

export interface DGMarketQueryNFTOfferParams {
  readonly tokenId?: string
  readonly owner?: string
  readonly buyer?: string
  readonly limit?: number
  readonly offset?: number
  readonly orderPrice?: SortOrder
  readonly minPrice?: string
  readonly maxPrice?: string
}

export interface DGMarketQueryNFTBidParams {
  readonly tokenId?: string
  readonly owner?: string
  readonly bidder?: string
  readonly limit?: number
  readonly offset?: number
  readonly orderPrice?: SortOrder
  readonly minPrice?: string
  readonly maxPrice?: string
}

export interface DGMarketQueryUserParams {
  readonly address?: string
}

export interface DGMarketQueryTxMsgParams {
  readonly hash?: string
}
