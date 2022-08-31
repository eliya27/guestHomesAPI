import express from "express";
const router = express.Router();

import {
  DeleteRoom,
  GetAllRoom,
  GetRoom,
  NewRoom,
  UpdateRoom,
  UpdateRoomAvailability,
} from "../controllers/rooms.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
//create
router.post("/:hotelID", verifyAdmin, NewRoom);
//update
router.put("/update/:id", UpdateRoom);
router.put("/availability/:id", UpdateRoomAvailability);
//delete
router.delete("/delete/:id/:hotelID", verifyAdmin, DeleteRoom);
//get
router.get("/:id", GetRoom);
//get All
router.get("/", GetAllRoom);

export default router;
