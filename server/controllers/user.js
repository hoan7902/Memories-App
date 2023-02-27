import mongoose from "mongoose"
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await User.findOne({ email: email })
        if(!existUser) res.status(404).json({
            message: 'Not found User'
        })
        
        const isTruePassword = await bcrypt.compare(password, existUser.password)
        
        if(!isTruePassword) return res.status(400).json({ message: 'Invalid password'})
        const token = jwt.sign({ email: existUser.email, id: existUser._id }, process.env.JWT_SECRET, { expiresIn: '1h'})
        console.log('here ...')
        
        console.log({
            result: existUser,
            token
        })

        return res.status(200).json({
            result: existUser,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong ...'
        })
    }
}

export const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, confirmPassword } = req.body

        const existUser = await User.findOne({ email })
        console.log("check exist User: ", existUser)

        if(existUser) return res.status(400).json({ message: 'User already exist'})

        if(password !== confirmPassword) return res.status(400).json({ message: 'Password doesn\'t match'})
        
        const hashPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashPassword, name: `${lastName} ${firstName}`})
        
        const token = jwt.sign({ email: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn: '1h'})

        res.status(200).json({ result, token })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong ...'
        })
    }
}