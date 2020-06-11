const initState = {
    loading: false,
    data: null,
    serverIndex: 0,
    pageIndex: 0,
    msg: '',
}

//comment

const coreReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_ERROR':
            return {
                ...state,
                data: null,
                loading: false,
                msg: "Error making request."
            }

        case 'FETCH_SUCCESS':
            return {
                ...state,
                data: action.data,
                loading: false,
                msg: '',
            }        
        
        case 'SELECT_SERVER':
            return {
                ...state,
                serverIndex: action.index,
                pageIndex: 0
            }

        case 'SELECT_PAGE':
            return {
                ...state,
                pageIndex: action.index
            }

        case 'EDIT_SUCCESS':
            return {
                ...state,
                msg: action.msg
            }

        case 'DELETE_SERVER':
            if((state.serverIndex == action.serverIndex ) && (state.serverIndex != 0)) {
                return {
                    ...state,
                    serverIndex: state.serverIndex - 1,
                    pageIndex: 0
                }
            } else {
                return {
                    ...state,
                    
                    pageIndex: 0
                }
            }

        case 'CLEAR_SESSION':
            return initState

        case 'IS_LOADING':
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}

export default coreReducer;