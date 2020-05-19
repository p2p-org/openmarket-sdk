import { marshalPubKey } from '@tendermint/amino-js'
import { bytesToBase64 } from '@tendermint/belt'
import bech32 from 'bech32'
import { fromSeed } from 'bip32'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { ECPair } from 'bitcoinjs-lib'
import crypto from 'crypto'
import fetch from 'node-fetch'
import secp256k1 from 'secp256k1'
import { _handleError } from './lib/helprers'
import { OpenMarketTxConfig, OpenMarketTxMessageParams } from './types'

const MPCHAIN = 'mpchain'

export class OpenMarketTxAPI {
  public readonly lcdUrl: string
  public readonly chainId: string
  public readonly path: string
  public readonly bech32MainPrefix: string

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
    this.path = config.path || "m/44'/118'/0'/0/0"
    this.bech32MainPrefix = config.bech32MainPrefix || 'cosmos'

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

  public getAddress(mnemonic: string): string {
    const seed = mnemonicToSeed(mnemonic)
    const node = fromSeed(seed)
    const child = node.derivePath(this.path)
    const words = bech32.toWords(child.identifier)
    return bech32.encode(this.bech32MainPrefix, words)
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

  public getECPairPriv(mnemonic: string): Buffer | undefined {
    const seed = mnemonicToSeed(mnemonic)
    const node = fromSeed(seed)
    const child = node.derivePath(this.path)
    if (!child.privateKey) {
      throw new Error('private key error')
    }
    const ecpair = ECPair.fromPrivateKey(child.privateKey, { compressed: false })
    return ecpair.privateKey
  }

  // public getECPairPrivFromPK(privateKey: Buffer): Buffer|undefined {
  //   const ecpair = ECPair.fromPrivateKey(privateKey, {compressed : false})
  //   return ecpair.privateKey;
  // }

  public broadcast(signedTx: object): Promise<any> {
    const broadcastApi = this.chainId.indexOf(MPCHAIN) !== -1 ? '/marketplace/txs' : '/txs'

    return fetch(this.lcdUrl + broadcastApi, {
      body: JSON.stringify(signedTx),
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

  public sign(signMessage: OpenMarketTxMessageParams, ecpairPriv: Buffer, modeType = 'sync'): object {
    // The supported return types includes "block"(return after tx commit), "sync"(return afer CheckTx) and "async"(return right away).
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(sortObject(signMessage)))
      .digest('hex')
    const buf = Buffer.from(hash, 'hex')
    const signObj = secp256k1.sign(buf, ecpairPriv)
    // const signatureBase64 = Buffer.from(signObj.signature, 'binary').toString('base64');
    const signatureBase64 = signObj.signature.toString('base64')
    let signedTx = {}
    if (this.chainId.indexOf(MPCHAIN) !== -1) {
      // stdSignMsg.bytes = convertStringToBytes(JSON.stringify(sortObject(signMessage)));
      signedTx = {
        // "mode": modeType,
        type: 'cosmos-sdk/StdTx',
        value: {
          fee: signMessage.fee,
          memo: signMessage.memo,
          msg: signMessage.msgs,
          signatures: [
            {
              pub_key: {
                type: 'tendermint/PubKeySecp256k1',
                value: getPubKeyBase64(ecpairPriv),
              },
              signature: signatureBase64,
            },
          ],
          type: signMessage.type,
        },
      }
    } else {
      signedTx = {
        mode: modeType,
        tx: {
          fee: signMessage.fee,
          memo: signMessage.memo,
          msg: signMessage.msgs,
          signatures: [
            {
              pub_key: bytesToBase64(marshalPubKey({
                type: 'tendermint/PubKeySecp256k1',
                value: getPubKeyBase64(ecpairPriv),
              }, false)),
              signature: signatureBase64,
            },
          ],
        },
      }
    }

    // signedTx.signatures = signedTx.signatures.map(s => ({
    //   pub_key: bytesToBase64(marshalPubKey(s.pub_key, false)),
    //   signature: s.signature
    // }))
    return signedTx
  }
}

// just for compatibility
// export function network(lcdUrl: string, chainId: string): OpenMarketTxAPI {
//   return new OpenMarketTxAPI({ lcdUrl, chainId });
// }

// function convertStringToBytes(str: string): readonly any[] {
//   // let myBuffer: string[]
//   const buffer = Buffer.from(str, 'utf8');
//   // for (let i = 0; i < buffer.length; i++) {
//
//   for (const b of buffer) {
//
//     myBuffer.push(b);
//   }
//   return myBuffer;
// }
//
function getPubKeyBase64(ecpairPriv: Buffer): string {
  return secp256k1.publicKeyCreate(ecpairPriv).toString('base64')
}

function sortObject(obj: any): any {
  if (obj === null) {
    return null
  }
  if (typeof obj !== 'object') {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(sortObject)
  }
  const sortedKeys = Object.keys(obj).sort()
  const result = {}
  sortedKeys.forEach((key) => {
    // @ts-ignore
    // tslint:disable-next-line: no-object-mutation
    result[key] = sortObject(obj[key])
  })
  return result
}

// module.exports = {
// 	network: network,
// 	msgs: msgs,
// }
