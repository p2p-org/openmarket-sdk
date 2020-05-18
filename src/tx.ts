import { marshalPubKey } from '@tendermint/amino-js'
import { bytesToBase64 } from '@tendermint/belt'
import {
  BroadcastMode,
  createAddress,
  createBroadcastTx,
  createWalletFromMnemonic,
  SignMeta,
  signTx,
  StdTx,
  Tx,
  Wallet,
} from '@tendermint/sig'

import { generateMnemonic } from 'bip39'
import { _handleError } from './lib/helprers'
import { OpenMarketTxConfig } from './types'

export class OpenMarketTxAPI {
  public readonly lcdUrl: string
  public readonly chainId: string

  // Logger function to use when debugging
  public readonly logger: (arg: string) => void

  /**
   * Create a new instance of OpenMarket.
   * @param config
   * @param logger logger, optional, a function that will be called with debugging
   *  information
   */
  constructor(config: OpenMarketTxConfig, logger?: (arg: string) => void) {
    this.lcdUrl = config.lcdUrl
    this.chainId = config.chainId

    if (!this.lcdUrl) {
      throw new Error('lcdUrl object was not set or invalid')
    }
    if (!this.chainId) {
      throw new Error('chainId object was not set or invalid')
    }

    // Debugging: default to nothing
    this.logger = logger || ((arg: string) => arg)
  }

  public randomMnemonic(strength?: number): string {
    // 128 <= strength <= 256, strength % 32 === 0
    return generateMnemonic(strength)
  }

  public getWallet(mnemonic: string): Wallet {
    return createWalletFromMnemonic(mnemonic)
  }

  public getAddress(mnemonic: string): string {
    const wallet = createWalletFromMnemonic(mnemonic)
    return createAddress(wallet.publicKey)
  }

  public getNodeInfo(address: string): Promise<any> {
    const accountsApi = '/node_info'
    return fetch(this.lcdUrl + accountsApi + address)
      .then((response) => response.json())
      .catch(_handleError)
  }

  public getAccounts(address: string): Promise<any> {
    const accountsApi = '/auth/accounts/'
    return fetch(this.lcdUrl + accountsApi + address)
      .then((response) => response.json())
      .catch(_handleError)
  }

  public getBalances(address: string): Promise<any> {
    const accountsApi = '/bank/balances/'
    return fetch(this.lcdUrl + accountsApi + address)
      .then((response) => response.json())
      .catch(_handleError)
  }

  public getPrivateKey(mnemonic: string): Uint8Array | undefined {
    const wallet = createWalletFromMnemonic(mnemonic)
    return wallet.privateKey
  }

  public broadcast(tx: StdTx, mode: BroadcastMode = 'sync'): Promise<any> {
    const broadcastApi = '/txs'

    // The supported return types includes "block"(return after tx commit), "sync"(return afer CheckTx) and "async"(return right away).

    return fetch(this.lcdUrl + broadcastApi, {
      body: JSON.stringify(createBroadcastTx(tx, mode)),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .catch(_handleError)
    // .then(tx => this.txCheck(tx))
  }

  public txCheck(tx: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let log: any = null
      if (tx && tx.result && tx.result.logs && tx.result.logs.length) {
        log = tx.result.logs[0]
        if (log.success) {
          return resolve(tx.result.txhash)
        }
      }
      reject(new Error(log && log.message ? log.message : 'unknown tx error'))
    })
  }

  public sign(tx: Tx | StdTx, wallet: Wallet, meta: SignMeta): StdTx {
    const signedTx = signTx(tx, meta, wallet)
    // @ts-ignore
    // tslint:disable-next-line: no-object-mutation
    signedTx.signatures = signedTx.signatures.map(s => ({
      pub_key: bytesToBase64(marshalPubKey(s.pub_key, false)),
      signature: s.signature
    }))
    return signedTx
  }
}
