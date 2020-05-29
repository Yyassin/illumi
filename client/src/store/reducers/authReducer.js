const initState = {
    accessToken: '',
    auth: false,
    authMsg: '',
}

//comment

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS':
            return {
                ...state,
                accessToken: action.accessToken,
                authMsg: '',
                auth: true
            }

        case 'AUTH_ERROR':
            return {
                ...state,
                auth: false,
                authMsg: action.authMsg,
            }

        case 'SIGN_OUT':
            return {
                ...state,
                auth: false,
                accessToken: '',
            }

        default:
            return state
    }
}

export default authReducer;