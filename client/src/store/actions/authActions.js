import axios from 'axios';
import queries from '../../queries/auth.queries';

export const authenticate = (user, type) => {
    return async (dispatch) => {
        try {
            const query = (type==='signin') ? queries.signin(user) : queries.signup(user)
            const result = await axios.post("/api", { query })

            if (result.data.errors) {
                return dispatch({type: 'AUTH_ERROR', authMsg: result.data.errors[0].message})
            }

            const data = result.data.data
            let token;
            let uid;
            
            if (type==='signin') {
                token = data.signin.token;
                uid = data.signin.uid;
            } else {
                token = data.signup.token;
                uid = data.signup.uid;
            }
        
            dispatch({type: 'AUTH_SUCCESS', accessToken: token, uid: uid })
            
        } catch (error) {
            console.log(error)
            dispatch({type: 'AUTH_ERROR', authMsg: error.response.data.errors[0].message})
        }
    }
}

export const signOut = (token) => {
    return async (dispatch, getState) => {
        try {
            const query = queries.signout()
            await axios.post("/api", { query }, {headers:{'token': token} })

            dispatch({type: 'SIGN_OUT'})
        } catch (error) {
            console.log(error.response)
            dispatch({type: 'SIGN_OUT'})
        }
    }
}