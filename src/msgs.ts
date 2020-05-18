/*
******************************************************
Billy NFT
******************************************************
*/

import { Tx } from '@tendermint/sig'
import { OpenMarketTxMessageParams } from './types'

export function NewMessageMintNFT(input: OpenMarketTxMessageParams): Tx {
  return {
    // // account_number: String(input.account_number),
    // // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'cosmos-sdk/MsgMintNFT',
        value: {
          Denom: input.denom,
          ID: input.token_id,
          Recipient: input.recipient,
          // specific case of cosmos/x/nft/
          Sender: input.sender,
          TokenURI: input.token_uri,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMessageBurnNFT(input: OpenMarketTxMessageParams): Tx {
  return {
    // // account_number: String(input.account_number),
    // // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'cosmos-sdk/MsgBurnNFT',
        value: {
          Denom: input.denom,
          ID: input.token_id,
          Sender: input.sender,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgEditNFTMetadata(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'cosmos-sdk/MsgEditNFTMetadata',
        value: {
          Denom: input.denom,
          ID: input.token_id,
          // specific case of cosmos/x/nft/
          Sender: input.sender,
          TokenURI: input.token_uri,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgTransferNFT(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'cosmos-sdk/MsgTransferNFT',
        value: {
          Denom: input.denom,
          ID: input.token_id,
          Recipient: input.recipient,
          // specific case of cosmos/x/nft/
          Sender: input.sender,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

/*
******************************************************
Update NFT Params
******************************************************
*/

export function NewMsgUpdateNFTParams(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/UpdateNFTParams',
        value: {
          owner: input.owner,
          params: input.params,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

/*
******************************************************
Market
******************************************************
*/

export function NewMessagePutNFTOnMarket(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/PutNFTOnMarket',
        value: {
          beneficiary: input.beneficiary,
          owner: input.owner,
          price: [
            {
              amount: String(input.price.amount),
              denom: input.price.denom,
            },
          ], // vars of type sdk.Coins declared like this
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgBuyNFT(input: OpenMarketTxMessageParams): Tx {
  return {
    // // account_number: String(input.account_number),
    // // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/BuyNFT',
        value: {
          beneficiary: input.beneficiary,
          beneficiary_commission: input.beneficiary_commission,
          buyer: input.buyer,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgRemoveNFTFromMarket(input: OpenMarketTxMessageParams): Tx {
  return {
    // // account_number: String(input.account_number),
    // // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/RemoveNFTFromMarket',
        value: {
          owner: input.owner,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

/*
******************************************************
Fungible Tokens
******************************************************
*/

export function NewMsgCreateFungibleToken(input: OpenMarketTxMessageParams): Tx {
  return {
    // // account_number: String(input.account_number),
    // // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/CreateFungibleToken',
        value: {
          amount: input.amount,
          creator: input.creator,
          denom: input.denom,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgTransferFungibleTokens(input: OpenMarketTxMessageParams): Tx {
  return {
    // // account_number: String(input.account_number),
    // // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/TransferFungibleTokens',
        value: {
          amount: input.amount,
          denom: input.denom,
          owner: input.owner,
          recipient: input.recipient,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgBurnFungibleTokens(input: OpenMarketTxMessageParams): Tx {
  return {
    // // account_number: String(input.account_number),
    // // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/BurnFungibleTokens',
        value: {
          amount: input.amount,
          denom: input.denom,
          owner: input.owner,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

/*
******************************************************
Offers
******************************************************
*/

export function NewMsgMakeOffer(input: OpenMarketTxMessageParams): Tx {
  return {
    // // account_number: String(input.account_number),
    // // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/MakeOffer',
        value: {
          beneficiary_commission: input.beneficiary_commission,
          buyer: input.buyer,
          buyer_beneficiary: input.beneficiary,
          price: [
            {
              amount: String(input.price.amount),
              denom: input.price.denom,
            },
          ],
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgAcceptOffer(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/AcceptOffer',
        value: {
          beneficiary_commission: input.beneficiary_commission,
          offer_id: input.offer_id,
          seller: input.seller,
          seller_beneficiary: input.beneficiary,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgRemoveOffer(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/RemoveOffer',
        value: {
          buyer: input.buyer,
          offer_id: input.offer_id,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

/*
******************************************************
Auction
******************************************************
*/

export function NewMsgPutNFTOnAuction(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/MsgPutNFTOnAuction',
        value: {
          beneficiary: input.beneficiary,
          buyout_price: [
            {
              amount: String(input.buyout.amount),
              denom: input.price.denom,
            },
          ],
          opening_price: [
            {
              amount: String(input.price.amount),
              denom: input.price.denom,
            },
          ],
          owner: input.owner,
          time_to_sell: input.time_to_sell,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}


export function NewMsgRemoveNFTFromAuction(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/MsgRemoveNFTFromAuction',
        value: {
          owner: input.owner,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgFinishAuction(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/MsgFinishAuction',
        value: {
          owner: input.owner,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgMakeBidOnAuction(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/MsgMakeBidOnAuction',
        value: {
          beneficiary_commission: input.commission,
          bid: [
            {
              amount: String(input.price.amount),
              denom: input.price.denom,
            },
          ],
          bidder: input.bidder,
          buyer_beneficiary: input.beneficiary,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgBuyoutOnAuction(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/MsgBuyoutOnAuction',
        value: {
          beneficiary_commission: input.commission,
          buyer: input.buyer,
          buyer_beneficiary: input.beneficiary,
          token_id: input.token_id,
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgIBCTransferFungibleTokens(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'ibc/transfer/MsgTransfer',
        value: {
          amount: [
            {
              amount: String(input.amount),
              denom: input.denom,
            },
          ],
          dest_height: String(input.destHeight),
          receiver: input.receiver,
          sender: input.sender,
          source_channel: input.sourceChannel,
          source_port: 'transfer',
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

export function NewMsgIBCTransferNFT(input: OpenMarketTxMessageParams): Tx {
  return {
    // account_number: String(input.account_number),
    // chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas,
    },
    memo: input.memo,
    msg: [
      {
        type: 'marketplace/transfer/MsgTransfer',
        value: {
          denom: input.denom,
          destination_height: String(input.destHeight),
          id: input.id,
          receiver: input.receiver,
          sender: input.sender,
          source_channel: input.sourceChannel,
          source_port: 'transfernft',
        },
      },
    ],
    // sequence: String(input.sequence),
  }
}

/*
******************************************************
Exports
******************************************************
*/

// module.exports = {
//     NewMessageMintNFT, NewMessageBurnNFT, NewMsgEditNFTMetadata, NewMsgTransferNFT,
//     NewMsgUpdateNFTParams,
//     NewMessagePutNFTOnMarket, NewMsgBuyNFT, NewMsgRemoveNFTFromMarket,
//     NewMsgCreateFungibleToken, NewMsgTransferFungibleTokens, NewMsgBurnFungibleTokens,
//     NewMsgMakeOffer, NewMsgAcceptOffer, NewMsgRemoveOffer,
//     NewMsgPutNFTOnAuction, NewMsgRemoveNFTFromAuction, NewMsgFinishAuction,
//     NewMsgMakeBidOnAuction, NewMsgBuyoutOnAuction
// };
