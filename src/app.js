import express from "express";
import db from './config/dbconnect.js'
import users from './models/User.js'
import routes from './routes/index.js'

db.on("error", console.log.bind(console, '# ! SERVER OFF-LINE ! #'))
db.once("open", () => {
    console.log('# - SERVER ON-LINE - #')
})


const app = express();

app.use(express.json())

routes(app)

export default app