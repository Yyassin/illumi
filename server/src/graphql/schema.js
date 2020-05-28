const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    id: ID!
    email: String!
    password: String!
    name: String!
}

type AuthData {
    token: String!
}

type RootQuery {
    users: [User!]!
    user(id: ID!): User!
    signin(email: String!, password: String!): AuthData!
    signout: String!
}

type RootMutation {
    signup(email: String!, password: String!): AuthData!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);