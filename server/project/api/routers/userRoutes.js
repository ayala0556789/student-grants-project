import express from 'express';
import { register, login,getAllUsers } from '../controller/userController.js'

const router = express.Router();

// נתיב להרשמה: http://localhost:5058/users/register
router.post('/register', register);

// נתיב להתחברות: http://localhost:5058/users/login
router.post('/login', login);



//שליפת כל המשתמשים:
router.get('/all', getAllUsers);



export const userRouters = router

