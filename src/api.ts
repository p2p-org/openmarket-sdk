// import axios from 'axios'
import { FetchPolicy } from 'apollo-client'
import { GQLClient } from './lib/gqlclient'
import { IS_DEV } from './lib/environment'
import { qNftAll, qNftBids, qNftById, qNftOffers, qNfts, qTokens, qTxMsgs, qUser } from './lib/gqlqueries'
import { _handleError } from './lib/helprers'
import {
  Network,
  OpenMarketAPIConfig,
  OpenMarketQueryNFTBidParams,
  OpenMarketQueryNFTOfferParams,
  OpenMarketQueryNFTParams,
  OpenMarketQueryTxMsgParams,
  OpenMarketQueryUserParams,
} from './types'

export const API_VERSION = 1
export const API_BASE_MAINNET = 'https://api.market.ggaming.com'
export const API_BASE_RINKEBY = 'https://rinkeby-api.market.ggaming.com'

// const API_PATH = `/api/v${API_VERSION}`

export class OpenMarketAPI {
  /**
   * Base lcdUrl for the API
   */
  public readonly apiBaseUrl: string
  /**
   * Logger function to use when debugging
   */
  public readonly logger: (arg: string) => void

  // @ts-ignore
  private readonly accessKey: string | undefined
  private readonly gqlHttpUrl: string
  private readonly gqlWsUrl: string
  private readonly gql: GQLClient
  private readonly fetchPolicy: FetchPolicy

  /**
   * Create an instance of the Market API
   * @param config MarketAPIConfig for setting up the API, including an optional API key, network name, and base URL
   * @param logger Optional function for logging debug strings before and after requests are made
   */
  constructor(config: OpenMarketAPIConfig, logger?: (arg: string) => void) {
    this.accessKey = config.accessKey

    switch (config.networkName) {
      case Network.Rinkeby:
        this.apiBaseUrl = config.apiBaseUrl || API_BASE_RINKEBY
        break
      case Network.Main:
      default:
        this.apiBaseUrl = config.apiBaseUrl || API_BASE_MAINNET
        break
    }

    this.fetchPolicy = config.fetchPolicy || 'cache-first'

    // Debugging: default to nothing
    this.logger = logger || ((arg: string) => arg)

    if (!config.gqlHttpUrl) {
      throw new Error('gqlHttpUrl required')
    }

    this.gqlHttpUrl = config.gqlHttpUrl
    this.gqlWsUrl = config.gqlWsUrl || ''

    this.gql = new GQLClient(
      { httpEndpoint: this.gqlHttpUrl, wsEndpoint: this.gqlWsUrl, accessKey: this.accessKey },
      logger
    )
  }

  public version(): string {
    return `v${API_VERSION}`
  }

  public apiVersion(): string {
    /* istanbul ignore next line */
    if (IS_DEV) {
      // tslint:disable-next-line:no-console
      console.warn('this method is deprecated, use #version instead')
      // this.logger('this method is deprecated, use #version instead')
    }

    return this.version()
  }

  public async getAllNft(): Promise<any> {
    try {
      const { data } = await this.gql.query({
        fetchPolicy: this.fetchPolicy,
        query: qNftAll,
      })
      return data.nfts || []
    } catch (e) {
      _handleError(e, this.logger)
    }
  }

  public async getOneNft(tokenId: string): Promise<any> {
    try {
      const { data } = await this.gql.query({
        fetchPolicy: this.fetchPolicy,
        query: qNftById,
        variables: { tokenId },
      })
      // tslint:disable-next-line:no-console
      // console.log(data)
      const result = data.nfts.length ? data.nfts.pop() : null
      return result
    } catch (e) {
      _handleError(e, this.logger)
    }
  }

  public async getNfts(params?: OpenMarketQueryNFTParams): Promise<any> {
    try {
      const { data } = await this.gql.query({
        fetchPolicy: this.fetchPolicy,
        query: qNfts,
        variables: params,
      })
      // tslint:disable-next-line:no-console
      // console.log(data)
      return data.nfts || []
    } catch (e) {
      _handleError(e, this.logger)
    }
  }

  public async getNftOffers(params?: OpenMarketQueryNFTOfferParams): Promise<any> {
    try {
      const { data } = await this.gql.query({
        fetchPolicy: this.fetchPolicy,
        query: qNftOffers,
        variables: params,
      })
      // tslint:disable-next-line:no-console
      // console.log(data)
      return data.offers || []
    } catch (e) {
      _handleError(e, this.logger)
    }
  }

  public async getNftBids(params?: OpenMarketQueryNFTBidParams): Promise<any> {
    try {
      const { data } = await this.gql.query({
        fetchPolicy: this.fetchPolicy,
        query: qNftBids,
        variables: params,
      })
      // tslint:disable-next-line:no-console
      // console.log(data)
      return data.auction_bids || []
    } catch (e) {
      _handleError(e, this.logger)
    }
  }

  public async getTxMsgs(params?: OpenMarketQueryTxMsgParams): Promise<any> {
    try {
      const { data } = await this.gql.query({
        fetchPolicy: this.fetchPolicy,
        query: qTxMsgs,
        variables: params,
      })
      // tslint:disable-next-line:no-console
      // console.log(data)
      return data.messages && data.messages.length ? data.messages[0] : null
    } catch (e) {
      _handleError(e, this.logger)
    }
  }

  public async getUser(params?: OpenMarketQueryUserParams): Promise<any> {
    try {
      const { data } = await this.gql.query({
        fetchPolicy: this.fetchPolicy,
        query: qUser,
        variables: params,
      })
      // tslint:disable-next-line:no-console
      // console.log(data)
      return data.users || []
    } catch (e) {
      _handleError(e, this.logger)
    }
  }

  public async getTokens(): Promise<any> {
    try {
      const { data } = await this.gql.query({
        fetchPolicy: this.fetchPolicy,
        query: qTokens,
      })
      return data.fungible_tokens || []
    } catch (e) {
        _handleError(e, this.logger)
    }
  }
}
