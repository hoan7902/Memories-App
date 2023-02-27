import * as api from '../api'

export const setIdPost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'GET_ID',
            payload: id
        })
    } catch (error) {
        console.log(error)
    }
}