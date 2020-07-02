import axios from 'axios';
import queries from '../../queries/auth.queries';

const API_URL = 'http://illumi2.canadaeast.cloudapp.azure.com'

export const authenticate = (user, type) => {
    return async (dispatch) => {
        try {
            const query = (type==='signin') ? queries.signin(user) : queries.signup(user)

            const result = await axios.post(`${API_URL}/api`,  { query })

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
            try {
                dispatch({type: 'AUTH_ERROR', authMsg: error.response.data.errors[0].message})
            } catch (error){
                console.log(error)
                dispatch({type: 'AUTH_ERROR', authMsg: 'Could not connect to server.'})
            }
        }
    }
}

export const signOut = (token) => {
    return async (dispatch, getState) => {
        dispatch({type: 'SIGN_OUT'})
    }
}