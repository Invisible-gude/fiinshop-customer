const initialState = {
    count:0
}
export const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COUNT_CART':
            return {
                ...state,
                count: action.payload
            }
        default:
            return state
    }
}