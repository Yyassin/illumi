import axios from 'axios';
import queries from '../../queries/core.queries';

const API_URL = 'http://illumi2.canadaeast.cloudapp.azure.com'


export const toggleLoading = () => {
    return async (dispatch) => {
        return dispatch({type: 'IS_LOADING'})
    }
}

export const darkTheme = () => {
    return async (dispatch) => {
        return dispatch({type: 'DARK_THEME'})
    }
}

export const lightTheme = () => {
    return async (dispatch) => {
        return dispatch({type: 'LIGHT_THEME'})
    }
}

export const init = (uid, token) => {
    return async (dispatch) => {
        try {

            const query = queries.init(uid);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }

            const data = result.data.data
        
            dispatch({type: 'FETCH_SUCCESS', data: data })
            
        } catch (error) {
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
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Created server.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const editServer = (serverData, serverID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.editServer(serverData, serverID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Edited server.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const deleteServer = (serverID, serverIndex, token) => {
    return async (dispatch) => {
        try {
            const query = queries.deleteServer(serverID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'DELETE_SERVER', serverIndex: serverIndex, msg: 'Deleted server.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const leaveServer = (memberID, serverIndex, token) => {
    return async (dispatch) => {
        try {
            const query = queries.leaveServer(memberID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            //might want to make new type, using delete to go back one
            dispatch({type: 'DELETE_SERVER', serverIndex: serverIndex, msg: 'Left Server.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const addPage = (pageData, serverID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.addPage(pageData, serverID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Created page.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const editPage = (pageData, pageID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.editPage(pageData, pageID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Edited page.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const deletePage = (pageID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.deletePage(pageID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'DELETE_PAGE', msg: 'Deleted page.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}


export const addRoom = (pageID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.addRoom(pageID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Created room.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const addEvent = (eventData, serverID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.addEvent(eventData, serverID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Created event.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const editEvent = (eventData, eventID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.editEvent(eventData, eventID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Edited event.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const deleteEvent = (eventID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.deleteEvent(eventID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Deleted event.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const editProfile = (profileData, uid, token) => {
    return async (dispatch) => {
        try {
            const query = queries.editProfile(profileData, uid);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Edited profile.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const deleteMessage = (messageID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.deleteMessage(messageID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Deleted message.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const editMember = (memberData, memberID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.editMember(memberData, memberID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Edited member.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const addInvite = (inviteData, senderID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.addInvite(inviteData, senderID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});


            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR', coreMsg: result.data.errors[0].message})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Sent invite!'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const acceptInvite = (inviteID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.acceptInvite(inviteID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Accepted invite.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}

export const declineInvite = (inviteID, token) => {
    return async (dispatch) => {
        try {
            const query = queries.declineInvite(inviteID);
            const result = await axios.post(`${API_URL}/api`, { query }, {headers:{'token': token}});

            if (result.data.errors) {
                return dispatch({type: 'FETCH_ERROR'})
            }
        
            dispatch({type: 'EDIT_SUCCESS', msg: 'Declined invite.'})
            
        } catch (error) {
            return dispatch({type: 'FETCH_ERROR'})
        }
    }
}