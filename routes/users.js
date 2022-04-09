import express from "express";
import mysql from "mysql";

import { getUsers, getUser, formCreateUser, createUser, deleteUser, updateUser} from "../controllers/users.js";

const router = express.Router();

/*
const users = [
    {
    firstname: "John",
    lastname: "Doe",
    age: 25
    }
]
*/

//all routes in here are starting with /users
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/user_created', formCreateUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;

