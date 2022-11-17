import express from "express";
import db from './config/dbconnect.js'
import routes from './routes/index.js'
import cors from 'cors'

db.on("error", console.log.bind(console, '# ! SERVER OFF-LINE ! #'))
db.once("open", () => {
    console.log('# - SERVER ON-LINE - #')
})


const app = express();

app.use(cors())
app.use(express.json())

routes(app)

export default app