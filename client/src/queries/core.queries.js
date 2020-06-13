const queries = {
    init: (uid) => {
        return(
            `
            {user(id: "${uid}")
                {
                    email
                    name
                    thumbnail
                    members {
                        role
                        server {
                            id
                            name
                            thumbnail
                            description
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
}

export default queries;