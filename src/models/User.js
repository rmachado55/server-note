import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        email: {type: String, required: true},
        name: {type: String, required: true},
        password: {type: String, required:true},
        })

    userSchema.pre('save', function (next) {
        if (this.isNew || this.isModified('password')){    
            bcrypt.hash(this.password, 10,
                (err, hashedPassword) => {
                    if(err)
                        next(err)
                    else{
                        this.password = hashedPassword;
                        next()
                    }
                })
        }
    });

    userSchema.methods.isCorrectPassword = function(password, callback) {
        bcrypt.compare(password, this.password, function(err, same){
            if(err)
                callback(err);
            else
                callback(err, same);
        })
    }

const users = mongoose.model('users', userSchema)

export default users;

