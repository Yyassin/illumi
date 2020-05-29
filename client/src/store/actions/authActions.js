import axios from 'axios';
import queries from '../../queries/auth.queries';

export const authenticate = (user, type) => {
    return async (dispatch) => {
        try {
            const query = (type==='signin') ? queries.signin(user) : queries.signup(user)
            const result = await axios.post("/api", { query })
            
            console.log(result)
            console.log(result.data.errors)
            if (result.data.errors) {
                return dispatch({type: 'AUTH_ERROR', authMsg: result.data.errors[0].message})
            }

            const data = result.data.data
            let token;
            
            if (type==='signin') {
                token = data.signin.token;
            } else {
                token = data.signup.token;
            }
        
            dispatch({type: 'AUTH_SUCCESS', accessToken: token })
            
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
            console.log(query)
            await axios.post("/api", { query }, {headers:{'token': token} })

            dispatch({type: 'SIGN_OUT'})
        } catch (error) {
            console.log(error.response)
            dispatch({type: 'SIGN_OUT'})
        }
    }
}