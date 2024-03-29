import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

const Posts = () => {
    const classes = useStyles()
    const posts = useSelector(state => state.posts)
    return ((posts.length != 0) ? (
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={6}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>) : <CircularProgress />
    )
}

export default Posts