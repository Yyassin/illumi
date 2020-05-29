const { buildSchema } = require('graphql');

module.exports = {
    
}

module.exports = buildSchema(`
type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    messages: [Message!]
}

type Message {
    id: ID!
    content: String!
    date: String
    userId: String!
    roomId: String!
}

type Room {
    id: ID!
    name: String!
    role_filter: [String!]!
}

type AuthData {
    token: String!
}

type RootQuery {
    users: [User!]!
    user(id: ID!): User!
    signin(email: String!, password: String!): AuthData!
    signout: String!

    getMessages(userId: String!): [Message!]
    getRooms(userId: String!): [Room!]
}

type RootMutation {
    signup(email: String!, password: String!): AuthData!
    
    createRoom(name: String!): Room!
    createMessage(content: String!, userId: String!, roomId: String! ): Message!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);