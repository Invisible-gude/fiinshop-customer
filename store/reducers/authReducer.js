const initialState = {
    user: {}
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_USER_LOGOUT':
            return {
                ...state,
                user: action.payload
            }
        case 'GET_LOGIN_USER':
            return { ...state }
        default:
            return state
    }
}