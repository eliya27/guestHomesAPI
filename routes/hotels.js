import express from "express";
const router = express.Router();

import {
  DeleteHotel,
  GetAllHotels,
  GetHotel,
  NewHotel,
  UpdateHotel,
  CountByCity,
  CountByType,
  getHotelRooms,
} from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";
//create
router.post("/new", verifyAdmin, NewHotel);
//update
router.put("/update/:id", verifyAdmin, UpdateHotel);
//delete
router.delete("/delete/find/:id", verifyAdmin, DeleteHotel);
//get
router.get("/find/:id", GetHotel);
//get All
router.get("/", GetAllHotels);

//Query Routes
router.get("/countByCity", CountByCity);
router.get("/countByType", CountByType);
router.get("/room/find/:id", getHotelRooms);

export default router;
