export const fetchPosts = () => async dispatch => {
    dispatch({
        type: 'GET_POSTS',
        payload: ['1st post', '2nd posts', '3 posts']
    })
}
