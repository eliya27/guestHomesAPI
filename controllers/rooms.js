import mongoose from "mongoose";
import Room from "../models/Room.js";
import hotels from "../models/hotels.js";
import { createError } from "../utils/error.js";

export const NewRoom = async (req, res) => {
  const hotelID = req.params.hotelID;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await hotels.findByIdAndUpdate(hotelID, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const UpdateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(createError(401, "Can not update room info"));
  }
};

export const UpdateRoomAvailability = async (req, res) => {
  try {
    const updatedRoom = await Room.updateOne(
      {
        "roomNumbers._id": req.params.id,
      },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json(`Room updated: ${updatedRoom}`);
  } catch (err) {
    next(err);
  }
};

export const DeleteRoom = async (req, res) => {
  const hotelID = req.params.hotelID;

  try {
    await hotels.findByIdAndDelete(req.params.id);
    try {
      await hotels.findByIdAndUpdate(hotelID, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

export const GetRoom = async (req, res) => {
  try {
    const getRoom = await Room.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (err) {
    next(err);
  }
};

export const GetAllRoom = async (req, res, next) => {
  try {
    const getAllRoom = await Room.find();
    res.status(200).json(getAllRoom);
  } catch (err) {
    next(err);
  }
};
