import 'dotenv/config'
import express from 'express'
import noteRoutes from './router/note'
import userRoutes from './router/user'
import morgan from 'morgan'
import createHttpError , {isHttpError} from 'http-errors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const app : express.Application = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 60 * 60 * 1000,
    },
    rolling : true,
    store : MongoStore.create({
        mongoUrl : process.env.MONGO_URL!
    })
}))
app.use('/api/v1/notes',noteRoutes)
app.use('/api/v1/users',userRoutes)
app.get('/',(req,res) => {
    res.send('<h1>Mohamed Elsayed</h1>')
})


app.use((req,res,next) => {
    next(createHttpError(404,'Endpoint not found'))
})

app.use((error : unknown , req : express.Request , res : express.Response) => {
    console.log(error)
    let errorMessage = 'An unknown error occurred'
    let statusCode = 500
    if(isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({error : errorMessage})
})

export default app