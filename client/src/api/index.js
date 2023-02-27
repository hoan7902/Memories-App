import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts')

export const createNewPost = (data) => API.post('/posts', data)

export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost)

export const deletePost = (id) => API.patch(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post('/users/signin', formData)

export const signUp = (formData) => API.post('/users/signup', formData)
