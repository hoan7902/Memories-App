import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routers/posts.js'
import userRoutes from './routers/user.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: false }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/users', userRoutes)

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`)))
  .catch(error => console.log(error.message))

