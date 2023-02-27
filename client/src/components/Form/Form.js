import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { Paper, TextField, Typography, Button } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { setIdPost } from '../../actions/idPost';

const Form = () => {
    const defaultPostData = {
        title: '', message: '', tags: '', selectedFile: ''
    }
    const [postData, setPostData] = useState(defaultPostData)
    const classes = useStyles()
    const dispatch = useDispatch()
    const idPost = useSelector(state => state.idPost)
    const posts = useSelector(state => state.posts)
    const [titleForm, setTitleForm] = useState('Create your memory')
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (idPost != -1 && posts.length > 0) {
            const updatePostData = posts.find(post => post._id === idPost);
            setPostData(updatePostData);
        }
        if (idPost != -1) {
            setTitleForm('Update your memory')
        }
        else if (idPost == -1) {
            setTitleForm('Create your memory')
        }
    }, [idPost]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (idPost == -1) {
            dispatch(createPost({ ...postData, name: user?.result.name }))
        }
        else {
            dispatch(updatePost(idPost, { ...postData, name: user?.result.name }))
        }
        clear()
    }

    const clear = () => {
        dispatch(setIdPost(-1))
        setTitleForm('Create your memory')
        setPostData(pre => defaultPostData)
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant='h6'>{titleForm}</Typography>
                    {/* <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={e => setPostData({ ...postData, creator: e.target.value })} /> */}
                    <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={e => setPostData({ ...postData, message: e.target.value })} />
                    <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={e => setPostData({ ...postData, tags: e.target.value })} />
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </div>
    )
}

export default Form