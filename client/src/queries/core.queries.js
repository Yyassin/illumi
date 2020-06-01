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
                                rooms {
                                    messages {
                                        content
                                        date
                                        user{
                                            email
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