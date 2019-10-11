// import axios from 'axios'
import { IS_DEV } from './environment'
import { GQLClient } from './gqlclient'
import { qNftById, qNftList } from './gqlqueries'
import { DGMarketAPIConfig, Network } from './types'

export const API_VERSION = 1
export const API_BASE_MAINNET = 'https://api.market.ggaming.com'
export const API_BASE_RINKEBY = 'https://rinkeby-api.market.ggaming.com'

// const API_PATH = `/api/v${API_VERSION}`

export class DGMarketAPI {
  /**
   * Base url for the API
   */
  public readonly apiBaseUrl: string
  /**
   * Logger function to use when debugging
   */
  public readonly logger: (arg: string) => void

  // @ts-ignore
  private readonly apiKey: string | undefined
  private readonly gqlHttpUrl: string
  private readonly gqlWsUrl: string
  private readonly gql: GQLClient

  /**
   * Create an instance of the Market API
   * @param config MarketAPIConfig for setting up the API, including an optional API key, network name, and base URL
   * @param logger Optional function for logging debug strings before and after requests are made
   */
  constructor(config: DGMarketAPIConfig, logger?: (arg: string) => void) {
    this.apiKey = config.apiKey

    switch (config.networkName) {
      case Network.Rinkeby:
        this.apiBaseUrl = config.apiBaseUrl || API_BASE_RINKEBY
        break
      case Network.Main:
      default:
        this.apiBaseUrl = config.apiBaseUrl || API_BASE_MAINNET
        break
    }

    // Debugging: default to nothing
    this.logger = logger || ((arg: string) => arg)

    this.gqlWsUrl = config.gqlWsUrl || 'ws://localhost:8080/v1/graphql'
    this.gqlHttpUrl = config.gqlHttpUrl || 'http://localhost:8080/v1/graphql'

    this.gql = new GQLClient(this.gqlHttpUrl, this.gqlWsUrl, logger)
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
        // tslint:disable-next-line: no-unsafe-any
        query: qNftList,
      })
      return data.nfts || []
    } catch (e) {
      if (e instanceof Error) {
        // be sure to re-throw it if you can't properly resolve it
        this._handleError(e)
      } else {
        // probably dealing with a naked string or number here
        // handle if you can, otherwise re-throw.
        throw e
      }
    }
  }

  public async getOneNft(tokenId: string): Promise<any> {
    try {
      const { data } = await this.gql.query({
        // tslint:disable-next-line: no-unsafe-any
        query: qNftById,
        variables: { tokenId },
      })
      // tslint:disable-next-line:no-console
      console.log(data)
      const result = data.nfts.length ? data.nfts.pop() : null
      return result
    } catch (e) {
      if (e instanceof Error) {
        this._handleError(e)
      } else {
        throw e
      }
    }
  }

  private _handleError(error: Error): void {
    // todo remove
    // tslint:disable-next-line:no-console
    console.error(error)
    const msg = `DGMarket API Error: ${error.message}`
    this.logger(msg)
    throw new Error(msg)
  }
}
