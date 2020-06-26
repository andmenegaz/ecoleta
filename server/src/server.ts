import express from 'express'
import routes from './routes'
import path from 'path'
import cors from 'cors'
import * as fs from 'fs'
import * as https from 'https'


const app = express()

const options = {
    cert: fs.readFileSync(path.resolve(__dirname, 'keys', 'cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, 'keys', 'key.pem'))
  }

app.use(express.json())

app.use(cors())

app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

https.createServer(options, app).listen(3001)