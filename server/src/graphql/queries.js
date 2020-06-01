const graphql = require('graphql');

// models
const User = require('../models/user.model')
const Member = require('../models/member.model')
const Server = require('../models/server.model')
const Page = require('../models/page.model')
const Room = require('../models/room.model')
const Message = require('../models/message.model')

// resolvers
const auth = require('./resolvers/auth.resolver')

const types = require('./types')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//Root query
module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        // auth
        signin: {
            type: types.AuthDataType,
            args: {
                email: { type: GraphQLString},
                password: { type: GraphQLString}
            },
            resolve(parent, args) {
                return auth.signin(args)
            }
        },

        // get queries
        user: {
            type: types.UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },
        
        users: {
            type: new GraphQLList(types.UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },

        member: {
            type: types.MemberType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Member.findById(args.id)
            }
        },        

        members: {
            type: new GraphQLList(types.MemberType),
            resolve(parent, args) {
                return Member.find({})
            }
        },

        server: {
            type: types.ServerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Server.findById(args.id)
            }
        },        

        servers: {
            type: new GraphQLList(types.ServerType),
            resolve(parent, args) {
                return Server.find({})
            }
        },

        page: {
            type: types.PageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Page.findById(args.id)
            }
        },        

        pages: {
            type: new GraphQLList(types.PageType),
            resolve(parent, args) {
                return Page.find({})
            }
        },

        room: {
            type: types.RoomType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Room.findById(args.id)
            }
        },        

        rooms: {
            type: new GraphQLList(types.RoomType),
            resolve(parent, args) {
                return Room.find({})
            }
        },

        message: {
            type: types.MessageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Message.findById(args.id)
            }
        },        

        messages: {
            type: new GraphQLList(types.MessageType),
            resolve(parent, args) {
                return Message.find({})
            }
        },

    }
})