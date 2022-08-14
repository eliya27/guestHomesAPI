import User from "../models/users.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const NewUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await NewUser.save();
    const { password, isAdmin, ...others } = NewUser._doc;
    //res.status(200).json("New User created");
    res.status(200).json({ message: "New user created", user_data: others });
  } catch (err) {
    next(err);
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const loginUser = await User.findOne({
      username: req.body.username,
    });
    if (!loginUser) return next(createError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong Password/Username"));
    const token = jwt.sign(
      { id: loginUser._id, isAdmin: loginUser.isAdmin },
      process.env.JWT_SECRET
    );
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(loginUser);
  } catch (err) {
    throw err;
  }
};
