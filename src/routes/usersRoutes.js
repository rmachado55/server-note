import express from "express";
import UsersController from '../controllers/usersController.js';


const router = express.Router();

router
    .get("/users", UsersController.listAllUsers)

    .post("/users/register", UsersController.registerNewUser)

    .delete("/users/delete/:id", UsersController.excludeUser)    
    
    .post("/users/login", UsersController.validateLogin) 

export default router;