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
                            name
                            thumbnail
                            pages {
                                title
                                tag
                                rooms {
                                    messages {
                                        content
                                        date
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
            `
        )
    },
}

export default queries;