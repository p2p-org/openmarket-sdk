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
