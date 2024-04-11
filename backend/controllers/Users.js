import { UserModel } from "../models/User_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { LocationModel } from "../models/Location_model.js";
dotenv.config();

export const userData = async (req, res) => {
  const place_id = req.params.place_id;
  const users = await UserModel.find({ place_id });

  res.status(200).json(users);
};

export const Profile = async (req, res) => {
  const userID = req.params.userID;
  var user = await UserModel.findById(userID);
  const location = await LocationModel.findById(user.place_id);
  user = {
    ...user._doc,
    city: location.city,
  };
  res.status(200).json(user);
};

export const Register = async (req, res) => {
  try {
    const { name, email, password, latitude, longitude, city, place_id } =
      req.body;

    const user = await UserModel.findOne({ email });
    const location = await UserModel.findOne({ place_id });

    if (!city || !place_id) {
      return res.json({
        error: true,
        message: "Please enable your location services to continue !",
      });
    }

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
      place_id,
    });

    if (!location) {
      const newLocation = new LocationModel({
        _id: place_id,
        city,
      });
      await newLocation.save();
    }
    await newUser.save();
    res.json({
      message: "User registered successfully! Please login to continue",
      error: false,
      response: newUser,
    });
  } catch (e) {
    res.status(400).json({
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
