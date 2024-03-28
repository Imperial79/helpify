import express from 'express';
import { Login, Profile, Register, editUser,userData } from '../controllers/Users.js';

const router = express.Router();

router.get("/:place_id", userData);
router.get("/profile/:userID", Profile);

router.post('/register',Register);
router.post("/login", Login);

router.put("/edit-user/:userID", editUser);

export {router as userRouter};