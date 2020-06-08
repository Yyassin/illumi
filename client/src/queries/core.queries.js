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
                            pages {
                                title
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

    addPage: (pageData, serverID) => {
        const { title, image, video, tag, content } = pageData
        //console.log(name + description + outline + thumbnail)
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