import express from "express";
import mongoose from "mongoose";
import nodemon from "nodemon";
import BodyParser from "body-parser";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import usersRoute from "./routes/users.js";
import users_authRoute from "./routes/users_auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const PORT = process.env.PORT || 7000;
dotenv.config();
const app = express();

const connect = async () => {
  try {
    mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

//Middlewares
app.use(cors());
app.use(CookieParser());
app.use(BodyParser.json({ extended: true }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use("/api/users", usersRoute);
app.use("/api/users", users_authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something is wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`We are Live!! on port: ${PORT}`);
});
