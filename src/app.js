import express from "express";

const app = express();

app.use(express.json())

const users = [
    {id: 1, "name" : "Ricardo Machado", "email" : "ricardo.machado7@hotmail.com", "password" : "apenasteste"},
    {id: 2, "name" : "Luke Skywalker", "email" : "luke@skywalker.com", "password" : "apenasteste"}
]

app.get('/', (req,res) => {
    res.status(200).send('Api Notes');
})

app.get('/users', (req,res) => {
    res.status(200).json(users)
})

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