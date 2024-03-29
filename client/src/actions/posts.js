import * as api from '../api'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes'

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        dispatch({
            type: FETCH_ALL,
            payload: data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createNewPost(post)
        dispatch({
            type: CREATE,
            payload: data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, updatePost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatePost)
        dispatch({
            type: UPDATE,
            payload: data.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.deletePost(id)
        dispatch({
            type: DELETE,
            payload: id
        })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({
            type: LIKE,
            payload: data.data
        })
    } catch (error) {
        console.log(error)
    }
}