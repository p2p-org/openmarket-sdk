// export * from './lib/async';
// export * from './lib/hash';
// export * from './lib/number';
import { DGMarketAPI } from './api'
import { DGMarket } from './market'
import { Network } from './types'

export {
  // Main SDK export:
  DGMarket,
  // So the API could be used separately:
  DGMarketAPI,
  // Types to help initialize SDK and listen to events.
  Network,
}
