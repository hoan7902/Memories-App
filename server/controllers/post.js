import express from 'express'
import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const postsMessage = await PostMessage.find()
        return res.status(201).json({
            message: 'ok!!!',
            data: postsMessage
        })
    }
    catch (err) {
        return res.status(404).json({
            message: 'maybe happen error',
            err: error.message
        })
    }
}

export const createPost = (req, res) => {
    const post = req.body
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        newPost.save()
        return res.status(201).json({
            message: 'create successfully',
            data: newPost
        })
    }
    catch (err) {
        return res.status(404).json({
            message: 'maybe happen error',
            err: error.message
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        const post = req.body
        if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('User is not valid')
        const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
        return res.status(201).json({
            message: 'update successfully',
            data: updatePost
        })
    } catch (error) {
        return res.status(404).json({
            message: 'maybe happen error',
            err: error.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('User is not valid')
        const deletePost = await PostMessage.findByIdAndRemove(id)
        return res.status(201).json({
            message: 'delete successfully',
            data: updatePost
        })
    } catch (error) {
        return res.status(404).json({
            message: 'maybe happen error',
            err: error.message
        })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
          }

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        
        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex((id) => id ===String(req.userId));

        if (index === -1) {
          post.likes.push(req.userId);
        } else {
          post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
   
        return res.status(201).json({
            message: 'update like post successfully',
            data: updatePost
        })
    } catch (error) {
        return res.status(404).json({
            message: 'maybe happen error',
            err: error.message
        })
    }
}
