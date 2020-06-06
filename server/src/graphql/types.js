const graphql = require('graphql');

// models
const User = require('../models/user.model')
const Member = require('../models/member.model')
const Server = require('../models/server.model')
const Page = require('../models/page.model')
const Room = require('../models/room.model')
const Message = require('../models/message.model')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        thumbnail: { type: GraphQLString },

        members: {
            type: new GraphQLList(MemberType),
            resolve(parent, args) {
                return Member.find({ userID: parent._id })
            }
        }
    })
})

const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        id: { type: GraphQLID },
        role: { type: GraphQLString },

        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userID)
            }
        },

        server: {
            type: ServerType,
            resolve(parent, args) {
                return Server.findById(parent.serverID)
            }
        },

    })
})

const ServerType = new GraphQLObjectType({
    name: 'Server',
    fields: () => ({
        id: { type: GraphQLID },
        name: {type: GraphQLID},
        description: { type: GraphQLString },
        outline: {type: GraphQLString},
        thumbnail: { type: GraphQLString },

        members: {
            type: new GraphQLList(MemberType),
            resolve(parent, args) {
                return Member.find({ serverID: parent._id })
            }
        },

        pages: {
            type: new GraphQLList(PageType),
            resolve(parent, args) {
                return Page.find({ serverID: parent._id })
            }
        }
    })
})

const PageType = new GraphQLObjectType({
    name: 'Page',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        image: { type: GraphQLString },
        video: { type: GraphQLString },
        content: { type: GraphQLString },
        tag: { type: GraphQLString },

        server: {
            type: ServerType,
            resolve(parent, args) {
                return Server.findById(parent.serverID)
            }
        },

        rooms: {
            type: new GraphQLList(RoomType),
            resolve(parent, args) {
                return Room.find({ pageID: parent._id })
            }
        }

    })
})

const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: () => ({
        id: { type: GraphQLID },
        role_filter: { type: GraphQLString },

        page: {
            type: PageType,
            resolve(parent, args) {
                return Page.findById(parent.pageID)
            }
        },

        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, args) {
                return Message.find({ roomID: parent._id })
            }
        },
    })
})

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        date: { type: GraphQLString },

        member: {
            type: MemberType,
            resolve(parent, args) {
                return Member.findById(parent.memberID)
            }
        },

        room: {
            type: RoomType,
            resolve(parent, args) {
                return Room.findById(parent.roomID)
            }
        },
    })
})


const AuthDataType = new GraphQLObjectType({   
    name: 'AuthData',
    fields: () => ({
        uid: { type: GraphQLString },
        token: { type: GraphQLString },
    })
})

module.exports = {
    UserType, MemberType, ServerType, PageType,
    RoomType, AuthDataType, MessageType
}