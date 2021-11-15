export const Login = () => async dispatch => {
    dispatch({
        type: 'SET_USER_LOGIN',
        payload: { name: 'Kanokkorn', email: 'kanokkorn@email.com' }
    })
}
export const Logout = () => async dispatch => {
    dispatch({
        type: 'SET_USER_LOGOUT',
        payload: {}
    })
}
export const getUserLoginData = () => async dispatch => {
    dispatch({
        type: 'GET_LOGIN_USER'
    })
}
