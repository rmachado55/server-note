import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import users from '../models/User.js' 

dotenv.config()

const secret = process.env.JWT_TOKEN

const WithAuth = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(!token)
        res.status(401).json({error: 'Unauthorized: No token Provided'});
    else{
        jwt.verify(token, secret, (err, decoded)=> {
            if(err)
            res.status(401).json({error: 'Unauthorized: Invalid Token'});
            else {
                req.email = decoded.email;
                users.findOne({email: decoded.email})
                .then(user => {
                    req.user = user;
                    next();
                })
                .catch(err => {
                    res.status(401).json({error: err})
                })
            }
        })
    }
}

export default WithAuth