import express from 'express'
import dotenv from 'dotenv'
import { dbConnection } from './database/dbConnection.js'
import { init } from './src/index.routes.js'


dotenv.config()
const app = express()
const port = 3000

app.use(express.static('uploads'))
app.use(express.json())
init(app)
dbConnection()
app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection',(err)=>{
    console.log('unhandledRejection',err)
})