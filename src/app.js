import express from "express";
import db from './config/dbconnect.js'
import users from './models/User.js'
import routes from './routes/index.js'

db.on("error", console.log.bind(console, '# !Conection Error! #'))
db.once("open", () => {
    console.log('# - Connection Sucessfull - #')
})


const app = express();

app.use(express.json())

routes(app)

app.post('/users/register', (req, res) => {
    users.push(req.body);
    res.status(201).send('Created new User')
})

app.put('/users/modify/password/:id', (req, res) => {
    let index = searchUser(req.params.id);
    users[index].password = req.body.password;
    res.json(users)    
})

function searchUser(id){
    return users.findIndex(user => user.id == id)
}

export default app