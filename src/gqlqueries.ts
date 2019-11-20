import gql from 'graphql-tag'

export const qNftAll = gql`
    query allNft {
        nfts {
            token_id
            token_uri
            user {
                address
            }
            price
            status
            id
            owner_address
        }
    }
`
export const qNftById = gql`
    query oneNft($tokenId: String!) {
        nfts(where: {
            token_id: { _like: $tokenId }
            deleted_at: {_is_null: true}
        }) {
            token_id
            token_uri
            user {
                address
            }
            price
            status
            id
            owner_address
        }
    }
`

export const qUser = gql`
    query ($address: String!) {
        users(where: {
            address: {_eq: $address}
            deleted_at: {_is_null: true}
        }) {
            address
            account_number
            balance
            sequence_number
            items_on_sale: nfts_aggregate(where: {status: {_neq: 0}}) {
                aggregate {
                    count(distinct: true)
                }
            }
            items_owned: nfts_aggregate {
                aggregate {
                    count(distinct: true)
                }
            }

        }
    }
`

// export const gameQuery = info => gql`query ($id: ID!) { game(id: $id) { ${info} } }`

export const qNftOffers = gql`
    query (
        $tokenId: String
        $offset: Int
        $limit: Int
        $owner: String
        $buyer: String
        #        $ordPrice: order_by = asc,
        #        $minPrice: String,
        #        $maxPrice: String
    ) {
        offers(
            where: {
                token_id: {_eq: $tokenId}
                buyer: {_ilike: $buyer}
                nft: { owner_address: {_ilike: $owner} }
#                price: {_gte: $minPrice, _lte: $maxPrice}
                deleted_at: {_is_null: true}
            },
            offset: $offset, limit: $limit,
            #            order_by: {price: $ordPrice}
        ) {
            price
            offer_id
            buyer
            nft {
                id
                token_id
                created_at
                owner_address
                status
            }
            created_at
            updated_at
        }
    }
`

export const qNftBids = gql`
    query(
        $tokenId: String
        $offset: Int
        $limit: Int
        $owner: String
        $bidder: String
        #        $ordPrice: order_by = asc
        #        $minPrice: String
        #        $maxPrice: String
    ) {
        auction_bids(
            where: {
                token_id: { _eq: $tokenId }
                bidder_address: { _ilike: $bidder }
                nft: { owner_address: { _ilike: $owner } }
                deleted_at: {_is_null: true}
            }
            #            price: { _gte: $minPrice, _lte: $maxPrice }
        ) {
            bidder_address
            price
            created_at
            updated_at
            nft {
                id
                owner_address
                status
                token_id
                created_at
            }
        }
    }
`

export const qNfts = gql`
    query Nft(
        $tokenId: String
        $status: Int
        $offset: Int
        $limit: Int
        $owner: String
        #    $ordPrice: order_by = asc
        #    $ordStatus: order_by = asc
        #    $minPrice: String
        #    $maxPrice: String
    ) {
        nfts(
            where: {
                status: { _eq: $status }
                token_id: { _ilike: $tokenId }
                owner_address: { _ilike: $owner }
                #        price: { _gte: $minPrice, _lte: $maxPrice }
                deleted_at: {_is_null: true}
            }
            offset: $offset
            limit: $limit
            order_by: {
                token_id: desc
#                created_at: asc,
#                status: $ordStatus,    
#                price: $ordPrice
            }
        ) {
            id
            token_id
            price
            owner: user {
                address
                items_on_sale: nfts_aggregate(where: {status: {_neq: 0}}) {
                    aggregate {
                        count(distinct: true)
                    }
                }
                items_owned: nfts_aggregate {
                    aggregate {
                        count(distinct: true)
                    }
                }
            }
            buyout_price
            status
            created_at
            updated_at
            time_to_sell
            opening_price
        }
    }
`

// auction_bids {
//   id
//   price
//   created_at
//   bidder_address
// }
// offers(where: {deleted_at: {_is_null: true}}) {
//   id
//   price
//   buyer
//   offer_id
// }



export const qTxMsgs = gql`
    query TxMsg ($hash: String, $search: String) {
        messages(where: {
            tx: { hash: { _eq: $hash } }
            signature: { _ilike: $search }
        }) {
            msg_type
            signature
            tx {
                log
                hash
                index
                height
            }
            signers
            failed
            error
        }
    }
`

//   REVIEW_UPD_SUBS: gql`
//     subscription ReviewUpdateSubscription {
//       reviewUpdated {
//         id
//         message
//         approved
//         game {
//           id
//           name
//           images(where: { type: "game_avatar" }) {
//             link
//           }
//           socials(where: { name: "Twitter" }) {
//             link
//           }
//         }
//       }
//     }
//   `,
//
//   REVIEW_DEL_SUBS: gql`
//     subscription ReviewRemoveSubscription {
//       reviewRemoved {
//         id
//       }
//     }
//   `,
//   TEST_SUBS: gql`
//     subscription {
//       messageAdded(channelId: 1) {
//         id
//         text
//       }
//     }
//   `,
// }
