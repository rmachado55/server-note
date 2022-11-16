import users from '../models/User.js'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const secret = process.env.JWT_TOKEN


class UserController{

    static listAllUsers = (req, res) => {
        users.find((err, users) => {
        res.status(200).json(users)
    })    
    }

    static registerNewUser = (req,res) => {
        let user = new users(req.body);
        user.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - Failed registering new user`})
            } else {
                res.status(201).send(user.toJSON())
            }
        })
    }

    static excludeUser = (req,res) => {
        const id = req.params.id;

        users.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'User Deleted'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static validateLogin = async(req,res) => {
            const {email, password} = req.body;
    
            try{
                let user = await users.findOne({ email });
                if(!user)
                    res.status(401).json({ error: 'Incorrect email or Password'});
                else{
                    user.isCorrectPassword(password, function(err, same){
                        if(!same)
                            res.status(401).json({error: 'Incorrect email or Password'});
                        else {
                            const token = jwt.sign({email}, secret, { expiresIn: '10d' });
                            res.json({user: user, token : token})
                        }
                    })
                }
            } catch (error) {
                res.status(500).json({error : 'Internal error, please try again'})
            }
    } 

}

export default UserController