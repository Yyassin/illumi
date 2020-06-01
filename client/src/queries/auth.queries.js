const queries = {
    signin: (user) => {
        const { email, password } = user
        return(
            `
            {signin(
                email:"${email}",
                password:"${password}")
                {
                    token
                    uid
                }
            }
            `
        )
    },
    
    signup: (user) => {
        const { email, password } = user
        return(
            `
            mutation{signup(
                email:"${email}",
                password:"${password}")
                {
                    token
                    uid
                }
            }
            `
        )
    },

    signout: () => {
        return(
            `
            {signout}
            `
        )
    },
}

export default queries;