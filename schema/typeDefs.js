import gql from 'graphql-tag';


const typeDefs = gql`
    type User {
        id: Int
        name: String
        email: String
    }

    type Query {
        getUsers: [User!]!
    }

    type Mutation {
        createUser(name: String!, email: String!): String!
        updateUser(id: ID!, name: String!, email: String!): String!
        deleteUser(id: ID!): String!
    }
`;


export default typeDefs;