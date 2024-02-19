import 'express-async-errors'
import app from './app';
import mongoose from 'mongoose'





const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running ${port}`)
    })    })
    .catch((error) => {
        console.log(error)
    })



