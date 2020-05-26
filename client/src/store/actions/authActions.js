import axios from 'axios';

export const authenticate = (user, type) => {
    return async (dispatch) => {
        try {
            const token = await axios.post("/api/auth/" + type, user)

            dispatch({type: 'AUTH_SUCCESS', accessToken: token.data.token})
        } catch (error) {
            console.log(error.response.data.message)
            dispatch({type: 'AUTH_ERROR', authMsg: error.response.data.message})
        }
    }
}

export const signOut = (token) => {
    return async (dispatch, getState) => {
        try {
            await axios.post("/api/auth/signout", {token: token})

            dispatch({type: 'SIGN_OUT'})
        } catch (error) {
            console.log(error.response.data.message)
            dispatch({type: 'SIGN_OUT'})
        }
    }
}