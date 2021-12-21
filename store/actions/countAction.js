export const countCart = (param) => async dispatch => {
    console.log('count',param);
    dispatch({
        type: 'SET_COUNT_CART',
        payload: param
    })
}
