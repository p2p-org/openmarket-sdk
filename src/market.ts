import { DGMarketAPI } from './api'
import { DGMarketAPIConfig, DGProvider } from './types'

export class DGMarket {
  // provider instance to use
  public readonly provider: DGProvider

  // Logger function to use when debugging
  public readonly logger: (arg: string) => void
  // API instance on this seaport
  public readonly api: DGMarketAPI

  // private readonly networkName: Network;
  // private _emitter: EventEmitter

  /**
   * Create a new instance of DGMarket.
   * @param provider Some Provider to use for transactions.
   * @param apiConfig configuration options, including `networkName`
   * @param logger logger, optional, a function that will be called with debugging
   *  information
   */
  constructor(provider: DGProvider, apiConfig: DGMarketAPIConfig, logger?: (arg: string) => void) {
    // API config
    this.api = new DGMarketAPI(apiConfig)

    // provider Config
    // this.provider = new DGProvider
    this.provider = provider
    // this.networkName = apiConfig.networkName || Network.Main;

    // Emit events
    // this._emitter = new EventEmitter()

    // Debugging: default to nothing
    this.logger = logger || ((arg: string) => arg)
  }
}
