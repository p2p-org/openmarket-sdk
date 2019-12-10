# openmarket-sdk

> Open Market API SDK


## Usage

``` bash
# install dependencies
$ npm install openmarket-sdk
```

```javascript
import {  OpenMarketTxAPI } from 'openmarket-sdk'

let api = new OpenMarketTxAPI({
  lcdUrl: 'http://localhost:1317', // rest server url
  chainId: 'mpchain',
})

//...
const mnemonic = 'abra kadabra ...'
const address = api.getAddress(mnemonic)
const ecpairPriv = api.getECPairPriv(mnemonic)
//...
let someTxMsg = {
  //...
}

const signedTx = api.sign(someTxMsg, Buffer.from(ecpairPriv))
let tx = await api.broadcast(signedTx)

```
