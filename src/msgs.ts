/*
******************************************************
Billy NFT
******************************************************
*/

import {TxMessageParams} from "./types";

export function NewMessageMintNFT(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "cosmos-sdk/MsgMintNFT",
      value: {
        Denom: input.denom,
        ID: input.token_id,
        Recipient: input.recipient,
        // specific case of cosmos/x/nft/
        Sender: input.sender,
        TokenURI: input.token_uri
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMessageBurnNFT(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "cosmos-sdk/MsgBurnNFT",
      value: {
        Denom: input.denom,
        ID: input.token_id,
        Sender: input.sender,
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgEditNFTMetadata(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "cosmos-sdk/MsgEditNFTMetadata",
      value: {
        Denom: input.denom,
        ID: input.token_id,
        // specific case of cosmos/x/nft/
        Sender: input.sender,
        TokenURI: input.token_uri
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgTransferNFT(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "cosmos-sdk/MsgTransferNFT",
      value: {
        Denom: input.denom,
        ID: input.token_id,
        Recipient: input.recipient,
        // specific case of cosmos/x/nft/
        Sender: input.sender,
      }
    }],
    sequence: String(input.sequence)
  };
}

/*
******************************************************
Update NFT Params
******************************************************
*/

export function NewMsgUpdateNFTParams(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/UpdateNFTParams",
      value: {
        owner: input.owner,
        params: input.params,
        token_id: input.token_id,
      }
    }],
    sequence: String(input.sequence)
  };
}


/*
******************************************************
Market
******************************************************
*/

export function NewMessagePutNFTOnMarket(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/PutNFTOnMarket",
      value: {
        beneficiary: input.beneficiary,
        owner: input.owner,
        price: [{
          amount: String(input.price.amount),
          denom: input.price.denom
        }], // vars of type sdk.Coins declared like this
        token_id: input.token_id
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgBuyNFT(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/BuyNFT",
      value: {
        beneficiary: input.beneficiary,
        beneficiary_commission: input.beneficiary_commission,
        buyer: input.buyer,
        token_id: input.token_id,
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgRemoveNFTFromMarket(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/RemoveNFTFromMarket",
      value: {
        owner: input.owner,
        token_id: input.token_id,
      }
    }],
    sequence: String(input.sequence)
  };
}


/*
******************************************************
Fungible Tokens
******************************************************
*/

export function NewMsgCreateFungibleToken(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/CreateFungibleToken",
      value: {
        amount: input.amount,
        creator: input.creator,
        denom: input.denom,
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgTransferFungibleTokens(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/TransferFungibleTokens",
      value: {
        amount: input.amount,
        denom: input.denom,
        owner: input.owner,
        recipient: input.recipient,
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgBurnFungibleTokens(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/BurnFungibleTokens",
      value: {
        amount: input.amount,
        denom: input.denom,
        owner: input.owner,
      }
    }],
    sequence: String(input.sequence)
  };
}


/*
******************************************************
Offers
******************************************************
*/

export function NewMsgMakeOffer(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/MakeOffer",
      value: {
        beneficiary_commission: input.beneficiary_commission,
        buyer: input.buyer,
        buyer_beneficiary: input.beneficiary,
        price: [{
          amount: String(input.price.amount),
          denom: input.price.denom
        }],
        token_id: input.token_id
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgAcceptOffer(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/AcceptOffer",
      value: {
        beneficiary_commission: input.beneficiary_commission,
        offer_id: input.offer_id,
        seller: input.seller,
        seller_beneficiary: input.beneficiary,
        token_id: input.token_id
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgRemoveOffer(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/RemoveOffer",
      value: {
        buyer: input.buyer,
        offer_id: input.offer_id,
        token_id: input.token_id
      }
    }],
    sequence: String(input.sequence)
  };
}


/*
******************************************************
Auction
******************************************************
*/

export function NewMsgPutNFTOnAuction(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/MsgPutNFTOnAuction",
      value: {
        beneficiary: input.beneficiary,
        buyout_price: [{
          amount: String(input.price.amount),
          denom: input.buyout_price.denom
        }],
        opening_price: [{
          amount: String(input.price.amount),
          denom: input.opening_price.denom
        }],
        owner: input.owner,
        time_to_sell: input.time_to_sell,
        token_id: input.token_id
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgRemoveNFTFromAuction(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/MsgRemoveNFTFromAuction",
      value: {
        owner: input.owner,
        token_id: input.token_id,
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgFinishAuction(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/MsgFinishAuction",
      value: {
        owner: input.owner,
        token_id: input.token_id,
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgMakeBidOnAuction(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/MsgMakeBidOnAuction",
      value: {
        beneficiary_commission: input.commission,
        bid: [{
          amount: String(input.price.amount),
          denom: input.opening_price.denom
        }],
        bidder: input.bidder,
        buyer_beneficiary: input.beneficiary,
        token_id: input.token_id
      }
    }],
    sequence: String(input.sequence)
  };
}

export function NewMsgBuyoutOnAuction(input: TxMessageParams): object {
  return {
    account_number: String(input.account_number),
    chain_id: input.chain_id,
    fee: {
      amount: [],
      gas: input.gas
    },
    memo: input.memo,
    msgs: [{
      type: "marketplace/MsgBuyoutOnAuction",
      value: {
        beneficiary_commission: input.commission,
        buyer: input.buyer,
        buyer_beneficiary: input.beneficiary,
        token_id: input.token_id,
      }
    }],
    sequence: String(input.sequence)
  };
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
