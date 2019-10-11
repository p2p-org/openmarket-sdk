export enum Network {
  Main = 'main',
  Rinkeby = 'rinkeby',
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
  readonly gqlHttpUrl?: string
  readonly gqlWsUrl?: string
}

export interface DGMarketGQLConfig {
  readonly httpEndpoint?: string
  readonly wsEndpoint?: string
}

export interface DGProvider {
  readonly networkName?: Network
}
