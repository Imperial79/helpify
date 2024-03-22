import express from 'express';
import { Login, Profile, Register } from '../controllers/Users.js';

const router = express.Router();

router.get("/profile/:userID", Profile);

router.post('/register',Register);

router.post("/login", Login);

export {router as userRouter};