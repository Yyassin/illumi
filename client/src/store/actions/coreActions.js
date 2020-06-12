import axios from 'axios';
import queries from '../../queries/core.queries';

export const toggleLoading = () => {
    return async (dispatch) => {
        return dispatch({type: 'IS_LOADING'})
    }
}

export const init = (uid, token) => {
    return async (dispatch) => {
        try {
            // console.log('init token ' + token)
            // console.log('init uid ' + uid)

            const query = queries.init(uid);
            const result = await axios.post("/api", { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }

            const data = result.data.data
            
            // console.log(data)
        
            dispatch({type: 'FETCH_SUCCESS', data: data })
            
        } catch (error) {
            console.log(error.response)
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const clearSession = () => {
    return (dispatch) => {
        return dispatch({type: 'CLEAR_SESSION'})
    }
}

export const selectServer = (index) => {
    return async (dispatch) => {
        return dispatch({type: 'SELECT_SERVER', index})
    }
}

export const selectPage = (index) => {
    return async (dispatch) => {
        return dispatch({type: 'SELECT_PAGE', index})
    }
}

export const addServer = (serverData, uid, token) => {
    return async (dispatch) => {
        try {
            const query = queries.addServer(serverData, uid);
            const result = await axios.post("/api", { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Created server.'})
            
        } catch (error) {
            console.log(error.response)
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const deleteServer = (serverID, serverIndex, token) => {
    return async (dispatch) => {
        try {
            const query = queries.deleteServer(serverID);
            const result = await axios.post("/api", { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'DELETE_SERVER', serverIndex: serverIndex, msg: 'Deleted server.'})
            
        } catch (error) {
            console.log(error.response)
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const addPage = (pageData, serverID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.addPage(pageData, serverID);
            const result = await axios.post("/api", { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Created page.'})
            
        } catch (error) {
            console.log(error.response)
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const editProfile = (profileData, uid, token) => {
    return async (dispatch) => {
        try {
            const query = queries.editProfile(profileData, uid);
            const result = await axios.post("/api", { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Edited profile.'})
            
        } catch (error) {
            console.log(error.response)
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const editServer = (serverData, serverID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.editServer(serverData, serverID);
            const result = await axios.post("/api", { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Edited server.'})
            
        } catch (error) {
            console.log(error.response)
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}