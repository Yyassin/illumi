const queries = {
    init: (uid) => {
        return(
            `
            {user(id: "${uid}")
                {
                    email
                    name
                    thumbnail
                    invites {
                        id
                        sender{
                            user{
                                name
                                thumbnail
                            }
                            server{
                                name
                                thumbnail
                            }
                        }
                    }
                    members {
                        id
                        role
                        server {
                            id
                            name
                            thumbnail
                            outline
                            description
                            events {
                                id
                                name
                                description
                                location
                                thumbnail
                                startDate
                                startTime
                                endDate
                                endTime
                            }
                            pages {
                                id
                                title
                                image
                                video
                                content
                                tag
                                rooms {
                                    id
                                    messages {
                                        id
                                        content
                                        date
                                        member{
                                            id
                                            role
                                            user{
                                                email
                                                name
                                                thumbnail
                                                id
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            `
        )
    },

    addServer: (serverData, uid) => {
        const { name, description, outline, thumbnail } = serverData
        //console.log(name + description + outline + thumbnail)
        return(
            `
            mutation{addServer(
                name:"${name}",
                description: "${description}",
                outline:"${outline}",
                thumbnail:"${thumbnail}",
                uid:"${uid}",)
                {
                    id
                }
            }
            `
        )
    },

    editServer: (serverData, serverID) => {
        const { name, description, outline, thumbnail } = serverData
        //console.log(name + description + outline + thumbnail)
        return(
            `
            mutation{editServer(
                name:"${name}",
                description: "${description}",
                outline:"${outline}",
                thumbnail:"${thumbnail}",
                serverID:"${serverID}",)
                {
                    id
                }
            }
            `
        )
    },

    deleteServer: (serverID, uid) => {
        return(
            `
            mutation{
                deleteServer(serverID: "${serverID}")
            }
            `
        )
    },

    leaveServer: (memberID) => {
        return(
            `
            mutation{
                leaveServer(memberID: "${memberID}")
            }
            `
        )
    },

    addPage: (pageData, serverID) => {
        const { title, image, video, tag, content } = pageData
        return(
            `
            mutation{addPage(
                title:"${title}",
                image: "${image}",
                video:"${video}",
                tag:"${tag}",
                content:"${content}",
                serverID:"${serverID}")
                {
                    id
                }
            }
            `
        )
    },

    editPage: (pageData, pageID) => {
        const { title, image, video, tag, content } = pageData
        return(
            `
            mutation{editPage(
                title:"${title}",
                image: "${image}",
                video:"${video}",
                tag:"${tag}",
                content:"${content}",
                pageID:"${pageID}")
                {
                    id
                }
            }
            `
        )
    },

    deletePage: (pageID) => {
        return(
            `
            mutation{
                deletePage(pageID: "${pageID}")
            }
            `
        )
    },

    addRoom: (pageID) => {
        return(
            `
            mutation{
                addRoom(pageID: "${pageID}"){
                    id
                }
            }
            `
        )
    },

    addEvent: (eventData, serverID) => {
        const { name, description, location, thumbnail, startDate, startTime, 
            endDate, endTime } = eventData
        return(
            `
            mutation{addEvent(
                name:"${name}",
                description: "${description}",
                location:"${location}",
                thumbnail:"${thumbnail}",
                startDate:"${startDate}",
                startTime:"${startTime}",
                endDate:"${endDate}",
                endTime:"${endTime}",
                serverID:"${serverID}")
                {
                    id
                }
            }
            `
        )
    },

    editEvent: (eventData, eventID) => {
        const { name, description, location, thumbnail, startDate, startTime, 
        endDate, endTime } = eventData
        return(
            `
            mutation{editEvent(
                name:"${name}",
                description: "${description}",
                location:"${location}",
                thumbnail:"${thumbnail}",
                startDate:"${startDate}",
                startTime:"${startTime}",
                endDate:"${endDate}",
                endTime:"${endTime}",
                eventID:"${eventID}")
                {
                    id
                }
            }
            `
        )
    },

    deleteEvent: (eventID) => {
        return(
            `
            mutation{
                deleteEvent(eventID: "${eventID}")
            }
            `
        )
    },

    editProfile: (userData, uid) => {
        const { name, thumbnail, password } = userData
        //console.log(name + description + outline + thumbnail)
        return(
            `
            mutation{editProfile(
                name:"${name}",
                thumbnail:"${thumbnail}",
                password:"${password}",
                uid:"${uid}")
                {
                    id
                }
            }
            `
        )
    },
    
    deleteMessage: (messageID) => {
        return(
            `
            mutation{
                deleteMessage(messageID: "${messageID}")
            }
            `
        )
    },

    editMember: (memberData, memberID) => {
        const { role } = memberData

        return(
            `
            mutation{editMember(
                role:"${role}",
                memberID:"${memberID}",)
                {
                    id
                }
            }
            `
        )
    },

    addInvite: (inviteData, senderID) => {
        const { email, role } = inviteData

        return(
            `
            mutation{addInvite(
                role:"${role}",
                senderID:"${senderID}",
                email:"${email}")
                {
                    id
                }
            }
            `
        )
    },

    acceptInvite: (inviteID) => {
        return(
            `
            mutation{acceptInvite(
                inviteID:"${inviteID}",
                )
                {
                    id
                    server{
                        name
                    }
                }
            }
            `
        )
    },

    declineInvite: (inviteID) => {
        return(
            `
            mutation{declineInvite(
                inviteID:"${inviteID}",
                )
            }
            `
        )
    },
}

export default queries;