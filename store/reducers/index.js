import { combineReducers } from 'redux'
import { postReducer } from './postReducer'
import { authReducer } from './authReducer'
import { countReducer } from './countAction'

export default combineReducers({
    post: postReducer,
    auth: authReducer,
    count: countReducer,
})