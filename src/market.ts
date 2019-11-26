import { OpenMarketAPI } from './api'
import { OpenMarketAPIConfig, OpenMarketProvider } from './types'

export class OpenMarket {
  // provider instance to use
  public readonly provider: OpenMarketProvider

  // Logger function to use when debugging
  public readonly logger: (arg: string) => void
  // API instance on this seaport
  public readonly api: OpenMarketAPI

  // private readonly networkName: Network;
  // private _emitter: EventEmitter

  /**
   * Create a new instance of OpenMarket.
   * @param provider Some Provider to use for transactions.
   * @param apiConfig configuration options, including `networkName`
   * @param logger logger, optional, a function that will be called with debugging
   *  information
   */
  constructor(provider: OpenMarketProvider, apiConfig: OpenMarketAPIConfig, logger?: (arg: string) => void) {
    // API config
    this.api = new OpenMarketAPI(apiConfig)

    // provider Config
    // this.provider = new OpenMarketProvider
    this.provider = provider
    // this.networkName = apiConfig.networkName || Network.Main;

    // Emit events
    // this._emitter = new EventEmitter()

    // Debugging: default to nothing
    this.logger = logger || ((arg: string) => arg)
  }
}
