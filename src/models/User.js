import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
// var bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        email: {type: String, required: true},
        name: {type: String, required: true},
        password: {type: String, required:true},
        color: {type: String},
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now}
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

