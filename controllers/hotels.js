import mongoose from "mongoose";
import Hotel from "../models/hotels.js";
import Room from "../models/Room.js";

export const NewHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const UpdateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const DeleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Hotel deleted!!" });
    res.status(200).json(deletedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const GetHotel = async (req, res) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const GetAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  //req.setHeader("X-Total-Count", 20);

  try {
    const getAllHotel = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 10000, $lt: max || 200000 },
    }).limit(req.query.limit);
    //res.set("Access-Control-Expose-Headers", "X-Total-Count");
    //res.set("X-Total-Count", "20");
    //res.append("X-Total-Count", "20");
    //res.append("Access-Control-Expose-Headers", "X-Total-Count");

    res.status(200).json(getAllHotel);
  } catch (err) {
    return next(err);
  }
};

export const CountByCity = async (req, res, next) => {
  const citiesData = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      citiesData.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (err) {
    return next(err);
  }
};

export const CountByType = async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const campCount = await Hotel.countDocuments({ type: "camp" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });

  try {
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "villa", count: villaCount },
      { type: "camp", count: campCount },
      { type: "resort", count: resortCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    return next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const getHotelRoom = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      getHotelRoom.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    //res.status(500).json(err);
    next(err);
  }
};
