import gql from 'graphql-tag'

export const qNftList = gql`
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
        nfts(where: { token_id: { _like: $tokenId } }) {
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

// export const gameQuery = info => gql`query ($id: ID!) { game(id: $id) { ${info} } }`

export const qNftOffers = gql`
    query (
        $tokenId: String,
        $offset: Int,
        $limit: Int,
        $owner: String,
        $buyer: String,
        #        $ordPrice: order_by = asc,
        #        $minPrice: String,
        #        $maxPrice: String
    ) {
        offers(
            where: {
                token_id: {_eq: $tokenId},
                buyer: {_ilike: $buyer},
                nft: { owner_address: {_ilike: $owner} },
                #                price: {_gte: $minPrice, _lte: $maxPrice}
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
            }
            #            price: { _gte: $minPrice, _lte: $maxPrice }
        ) {
            bidder_address
            price
            created_at
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
            }
            offset: $offset
            limit: $limit
            #      order_by: { status: $ordStatus, price: $ordPrice }
        ) {
            id
            token_id
            owner_address
            buyout_price
            status
            created_at
            time_to_sell
            opening_price
            auction_bids {
                id
                price
                created_at
                bidder_address
            }
            price
            offers {
                id
                price
                buyer
                offer_id
            }
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
