import { gql } from '@apollo/client';
// import gql from 'graphql-tag';


const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;


export {
  GET_USERS
};
