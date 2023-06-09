// import { gql } from '@apollo/client';
import gql from 'graphql-tag';

// USER

const CREATE_USER = gql`
    mutation CreateUser($name: String!, $email: String!) {
        createUser(name: $name, email: $email)
    }
`;


const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
        updateUser(id: $id, name: $name, email: $email)
    }
`;

const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        updateUser(id: $id)
    }
`;

export {
   CREATE_USER,
   UPDATE_USER,
   DELETE_USER,
};
