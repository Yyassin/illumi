const graphql = require('graphql');
const types = require('./types')

// models
const User = require('../models/user.model')
const Member = require('../models/member.model')
const Server = require('../models/server.model')
const Room = require('../models/room.model')
const Page = require('../models/page.model')
const Message = require('../models/message.model')

// resolvers
const auth = require('./resolvers/auth.resolver')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        // auth
        signup: {
            type: types.AuthDataType,
            args: {
                email: { type: GraphQLString},
                password: { type: GraphQLString},
                name: { type: GraphQLString},
                thumbnail: { type: GraphQLString},
            },
            resolve(parent, args) {
                return auth.signup(args)
            }
        },

        // create schemas
        // addUser: {
        //     type: types.UserType,
        //     args: {
        //         email: { type: GraphQLString },
        //         password: { type: GraphQLString }
        //     },
        //     resolve(parent, args) {
        //         let user = new User({
        //             email: args.email,
        //             password: args.password
        //         })

        //         return user.save();
        //     }
        // },

        addMember: {
            type: types.MemberType,
            args: {
                role: { type: GraphQLString },
                userID: { type: new GraphQLNonNull(GraphQLString) },
                serverID: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let member = new Member({
                    role: args.role,
                    userID: args.userID,
                    serverID: args.serverID
                })

                return member.save();
            }
        },

        addServer: {
            type: types.ServerType,
            args: {
                name: { type: GraphQLString },
                thumbnail: { type: GraphQLString},
            },
            resolve(parent, args) {
                let server = new Server({
                    name: args.name,
                    thumbnail: args.thumbnail
                })

                return server.save();
            }
        },

        addPage: {
            type: types.PageType,
            args: {
                title: { type: GraphQLString },
                serverID: { type: GraphQLString }
            },
            resolve(parent, args) {
                let page = new Page({
                    title: args.title,
                    serverID : args.serverID,
                })

                return page.save();
            }
        },

        addRoom: {
            type: types.RoomType,
            args: {
                pageID: { type: GraphQLString },
            },
            resolve(parent, args) {
                let room = new Room({
                    pageID: args.pageID
                })

                return room.save();
            }
        },

        addMessage: {
            type: types.MessageType,
            args: {
                roomID: { type: GraphQLString },
                memberID: { type: GraphQLString },
                content: { type: GraphQLString },
            },
            resolve(parent, args) {
                const today = new Date()
                // 2020-06-02 14:14
                const date = today.getFullYear() + '-' 
                            + (today.getMonth()+1) + '-' 
                            + today.getDate() + ' ' 
                            + today.getHours() + ':'
                            + today.getMinutes()

                let message = new Message({
                    roomID: args.roomID,
                    memberID: args.memberID,
                    content: args.content,
                    date: date,
                })

                return message.save();
            }
        }

        

    }
})