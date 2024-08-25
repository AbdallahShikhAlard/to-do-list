const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const taskRouts = require('./routers/taskRouters')
const UserRouter = require('./routers/UserRouter')
const {authenticateToken} = require('./middleware/authenticationToken')

dotenv.config();
const app = express()
const port = 8080 ;
app.use(express.json())

mongoose.connect(process.env.DATABASE_URI)

const db = mongoose.connection;
db.on('error' , ()=> {console.log('connection Error')})
db.once('open' , ()=>{console.log('connected to DB')})

app.use(taskRouts)
app.use(UserRouter)

app.listen(port , ()=>{console.log('server running on port 8080')})