import express from "express";
const router = express.Router();
import { RegisterUser, LoginUser } from "../controllers/users_auth.js";
router.post("/new", RegisterUser);
router.post("/login", LoginUser);

export default router;
