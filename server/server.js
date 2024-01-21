const express = require('express')
const userRouter = require('./routes/userRoutes')
const sitterRoutes = require('./routes/sitterRoutes')
const mongodbConnection = require('./config/mongodb')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/user',userRouter)
app.use('/sitter',sitterRoutes)

mongodbConnection()

app.listen(process.env.PORT,() => console.log(`server is running on ${process.env.PORT}`))





