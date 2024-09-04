import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      data {
        id
        title
        user {
          name
          email
          address {
            street
            suite
            city
            zipcode
          }
          phone
          website
          company {
            name
            catchPhrase
            bs
          }
        }
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($page: Int, $limit: Int) {
    posts(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        title
        body
        user {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

