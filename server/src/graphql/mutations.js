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

        editProfile: {
            type: types.UserType,
            args: {
                name: { type: GraphQLString},
                password: { type: GraphQLString},                
                thumbnail: { type: GraphQLString},
                uid: {type: GraphQLString},
            },
            async resolve(parent, args) {
                const user = await User.findById(args.uid)
                if(!user) return null;

                if(!(args.password === "")) {
                    user.password = await auth.newPassword(args.password)
                } 
                
                user.name = args.name
                user.thumbnail = args.thumbnail
                return user.save()
            }
        },

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
                description: { type: GraphQLString },
                outline: {type: GraphQLString},
                thumbnail: { type: GraphQLString },
                uid: { type: GraphQLString }
            },
            resolve(parent, args) {
                let server = new Server({
                    name: args.name,                    
                    description: args.description,
                    outline: args.outline,
                    thumbnail: args.thumbnail,
                })

                server.save();

                page = new Page({
                    title: 'General',
                    serverID : server.id,
                })

                page.save();

                if(args.uid){
                    let member = new Member({
                        serverID: server.id,
                        userID: args.uid,
                        role: 'admin'
                    })

                    member.save();
                }

                return server;
            }
        },

        // editServer()

        deleteServer: {
            type: GraphQLString,
            args: {
                serverID: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let server = await Server.findById(args.serverID)
                let pages = await Page.find({serverID: args.serverID})                
              
                pages.map( async (page) => {
                    
                    let room = await Room.find({pageID: page.id})

                    if(room[0]) {
                        await Message.deleteMany({roomID: room[0].id})
                        await Room.findByIdAndDelete(room[0].id)
                    }
                    
                    await Page.findByIdAndDelete(page.id)
                })

                await Member.deleteMany({serverID: args.serverID})
                await Server.findByIdAndDelete(args.serverID)
                
                return "Successfully deleted server";
            }
        },

        addPage: {
            type: types.PageType,
            args: {
                title: { type: GraphQLString },
                image: { type: GraphQLString },
                video: { type: GraphQLString },
                tag: { type: GraphQLString },
                content: { type: GraphQLString },
                serverID: { type: GraphQLString }
            },
            resolve(parent, args) {
                let page = new Page({
                    title: args.title,
                    image: args.image,
                    video: args.video,
                    tag: args.tag,
                    content: args.content,
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