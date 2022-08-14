import User from "../models/users.js";

export const UpdateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted!!" });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const GetUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const GetAllUsers = async (req, res, next) => {
  try {
    const getAllUser = await User.find();
    //const { username, password, email } = getAllUser._doc;
    res.status(200).json(getAllUser);
  } catch (err) {
    return next(err);
  }
};
export const checkAuth = async (req, res, next) => {
  res.send("Hello from JWT!!");
};
