const express = require('express')
const dbConnection = require('./config/dbConnection')
const userRouter = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const productRouter = require('./routes/productRoutes')
require('dotenv').config()

const app = express()


//Db connection
dbConnection()


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
}))

//routes
app.use("/user", userRouter)
app.use('/product', productRouter)

app.use("/", (req, res) => {
    res.status(200).json("server hitted")
})
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server starts on port ${process.env.PORT}`);
    }
})