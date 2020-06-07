const initState = {
    loading: false,
    data: null,
    serverIndex: 0,
    pageIndex: 0
}

//comment

const coreReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_ERROR':
            return {
                ...state,
                data: null,
                loading: false
            }

        case 'FETCH_SUCCESS':
            return {
                ...state,
                data: action.data,
                loading: false
            }

        case 'CLEAR_SESSION':
            return initState

        case 'IS_LOADING':
            return {
                ...state,
                loading: true
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

        default:
            return state
    }
}

export default coreReducer;