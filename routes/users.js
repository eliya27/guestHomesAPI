import express from "express";
const router = express.Router();
import {
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/users.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

/*router.get("/checkAuth", verifyToken, checkAuth);
router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("Hello from JWT you are autheniticated!!");
});*/
router.get("/", verifyAdmin, GetAllUsers);
router.get("/:id", verifyAdmin, GetUser);
router.put("/update/:id", verifyUser, UpdateUser);
router.delete("/delete/:id", verifyUser, DeleteUser);

export default router;
