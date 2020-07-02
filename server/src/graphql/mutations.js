const graphql = require('graphql');
const types = require('./types')

// models
const User = require('../models/user.model')
const Member = require('../models/member.model')
const Server = require('../models/server.model')
const Room = require('../models/room.model')
const Page = require('../models/page.model')
const Message = require('../models/message.model')
const Invite = require('../models/invite.model')
const Event = require('../models/event.model')

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

        editMember: {
            type: types.MemberType,
            args: {
                role: { type: GraphQLString },
                memberID: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                let member = await Member.findById(args.memberID)
                member.role = args.role
                return member.save()
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

                room = new Room({
                    pageID: page.id,
                })

                room.save();

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

        editServer: {
            type: types.ServerType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                outline: {type: GraphQLString},
                thumbnail: { type: GraphQLString },
                serverID: {type: GraphQLString}
            },
            async resolve(parent, args) {
                const server = await Server.findById(args.serverID)
                if(!server) return null;
                
                server.name = args.name
                server.thumbnail = args.thumbnail
                server.outline = args.outline
                server.description = args.description
                return server.save()
            }
        },

        deleteServer: {
            type: GraphQLString,
            args: {
                serverID: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let server = await Server.findById(args.serverID)
                let pages = await Page.find({serverID: args.serverID})
                let events = await Event.find({serverID: args.serverID})                 
              
                pages.map( async (page) => {
                    
                    let room = await Room.find({pageID: page.id})

                    if(room[0]) {
                        await Message.deleteMany({roomID: room[0].id})
                        await Room.findByIdAndDelete(room[0].id)
                    }
                    
                    await Page.findByIdAndDelete(page.id)
                })

                events.map (async (event) => {
                    await Event.findByIdAndDelete(event.id);
                })

                await Member.deleteMany({serverID: args.serverID})
                await Server.findByIdAndDelete(args.serverID)
                
                return "Successfully deleted server";
            }
        },

        leaveServer: {
            type: GraphQLString,
            args: {
                memberID: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let message = ""

                let member = await Member.findById(args.memberID)
                let server = await Server.findById(member.serverID)

                await member.delete()
                message += "Successfully deleted member."

                let members = await Member.find({serverID: server.id})
                
                if(members.length < 1) {
                    console.log(members.length)
                    //modularize
                    let pages = await Page.find({serverID: member.serverID})
                    let events = await Event.find({serverID: member.serverID})                 
                
                    pages.map( async (page) => {
                        
                        let room = await Room.find({pageID: page.id})

                        if(room[0]) {
                            await Message.deleteMany({roomID: room[0].id})
                            await Room.findByIdAndDelete(room[0].id)
                        }
                        
                        await Page.findByIdAndDelete(page.id)
                    })

                    events.map (async (event) => {
                        await Event.findByIdAndDelete(event.id);
                    })

                    await Member.deleteMany({serverID: member.serverID})
                    await Server.findByIdAndDelete(member.serverID)
                    
                    //need to do mutation here?
                    message += " Successfully deleted server."
                }
                
                return message;
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

        editPage: {
            type: types.PageType,
            args: {
                title: { type: GraphQLString },
                image: { type: GraphQLString },
                video: { type: GraphQLString },
                tag: { type: GraphQLString },
                content: { type: GraphQLString },
                pageID: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const page = await Page.findById(args.pageID)
                if(!page) return null;
                
                page.title = args.title
                page.image = args.image
                page.video = args.video
                page.tag = args.tag
                page.content = args.content
                return page.save()
            }
        },

        deletePage: {
            type: GraphQLString,
            args: {
                pageID: { type: GraphQLString },
            },
            async resolve(parent, args) {                
                let room = await Room.find({pageID: args.pageID})

                if(room[0]) {
                    await Message.deleteMany({roomID: room[0].id})
                    await Room.findByIdAndDelete(room[0].id)
                }
                
                await Page.findByIdAndDelete(args.pageID)

                return "Successfully deleted page";
            }
        },

        addEvent: {
            type: types.EventType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                location: { type: GraphQLString },
                thumbnail: { type: GraphQLString },
                startDate: { type: GraphQLString },
                startTime: { type: GraphQLString },
                endDate: { type: GraphQLString },
                endTime: { type: GraphQLString },
                serverID: { type: GraphQLString }
            },
            resolve(parent, args) {
                let event = new Event({
                    name: args.name,
                    description: args.description,
                    location: args.location,
                    thumbnail: args.thumbnail,
                    startDate: args.startDate,
                    startTime: args.startTime,
                    endDate: args.endDate,
                    endTime: args.endTime,
                    serverID : args.serverID,
                })

                return event.save();
            }
        },

        editEvent: {
            type: types.EventType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                location: { type: GraphQLString },
                thumbnail: { type: GraphQLString },
                startDate: { type: GraphQLString },
                startTime: { type: GraphQLString },
                endDate: { type: GraphQLString },
                endTime: { type: GraphQLString },
                eventID: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const event = await Event.findById(args.eventID)
                if(!event) return null;
                
                event.name = args.name
                event.description = args.description
                event.location = args.location
                event.thumbnail = args.thumbnail
                event.startDate = args.startDate
                event.startTime = args.startTime
                event.endDate = args.endDate
                event.endTime = args.endTime

                return event.save()
            }
        },

        deleteEvent: {
            type: GraphQLString,
            args: {
                eventID: { type: GraphQLString },
            },
            async resolve(parent, args) {                
                await Event.findByIdAndDelete(args.eventID)

                return "Successfully deleted event";
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
        },

        deleteMessage: {
            type: GraphQLString,
            args: {
                messageID: { type: GraphQLString },
            },
            async resolve(parent, args) {                
                await Message.findByIdAndDelete(args.messageID)

                return "Successfully deleted message";
            }
        },
        
        addInvite: {
            type: types.InviteType,
            args: {
                senderID: { type: GraphQLString },
                email: { type: GraphQLString },
                role: { type: GraphQLString },
            },
            async resolve(parent, args) {      
                const user = await User.findOne({email: args.email})

                if(!user) {
                    console.log('user w email not exist')
                    return Error("User with that email does not exist.")
                }
                    
                const sender = await Member.findById(args.senderID)
                const server = await Server.findById(sender.serverID)
                const serverMembers = await Member.find({serverID: server.id})
                
                const invites = await Invite.find({targetID: user.id})

                let badInvite = false;

                serverMembers.map( member => {
                    if (user.id === member.userID) {
                        badInvite = true;
                        return console.log('member in server')
                    }
                })

                for (let i=0; i <invites.length; i++) {
                    let inviteMember = await Member.findById(invites[i].senderID)
                    let inviteServer = await Server.findById(inviteMember.serverID)
                    
                    if (server.id === inviteServer.id) {
                        badInvite = true;
                        return Error('Member already invited to this server') 
                    }
                }

                if (badInvite) {
                    return Error("This user is already in your server.")
                }

                const invite = await new Invite({
                    senderID: args.senderID,
                    targetID: user.id,
                    role: args.role
                })

                return invite.save()
            }
        },

        acceptInvite: {
            type: types.MemberType,
            args: {
                inviteID: { type: GraphQLString },
            },
            async resolve(parent, args) {                
                const invite = await Invite.findById(args.inviteID)

                const target = await User.findById(invite.targetID)
                const sender = await Member.findById(invite.senderID)
                const server = await Server.findById(sender.serverID)

                const member = await new Member({
                    serverID: server.id,
                    userID: target.id,
                    role: invite.role
                })

                await Invite.findByIdAndDelete(args.inviteID)

                return member.save()
            }
        },

        declineInvite: {
            type: GraphQLString,
            args: {
                inviteID: { type: GraphQLString },
            },
            async resolve(parent, args) {                
                await Invite.findByIdAndDelete(args.inviteID)

                return "Succesfully deleted invitation."
            }
        },

    }
})
