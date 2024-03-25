import { UserModel } from "../models/User_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const userData = async (req, res) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
};

export const Profile = async (req, res) => {
  const userID = req.params.userID;
  const user = await UserModel.findById(userID);
  res.status(200).json(user);
};

export const Register = async (req, res) => {
  try {
    const { name, email, password, latitude, longitude } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        error: true,
        message: "You already have an account with this E-mail. Please login!",
      });
    }
    const hashPWD = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashPWD,
      latitude,
      longitude,
    });
    await newUser.save();
    res.json({
      message: "User registered successfully! Please login to continue",
      error: false,
      response: newUser,
    });
  } catch (e) {
    res.json({
      message: e,
      error: true,
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ error: true, message: "User doesn't exist" });
  }
  const isPwdValid = await bcrypt.compare(password, user.password);
  if (!isPwdValid) {
    return res.json({ error: true, message: "Password Incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET);
  res.json({
    error: false,
    message: "Login success",
    response: {
      token: token,
      user: user,
    },
  });
};

export const editUser = async (req, res) => {
  try {
    const user_id = req.params.userID;
    // console.log(req.body);
    const { name, email } = req.body;
    const User = await UserModel.findByIdAndUpdate(
      user_id,
      { name, email },
      { new: true }
    );
    if (!User) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(User);
  } catch (e) {
    res.sendStatus(400).send(e);
  }
};
