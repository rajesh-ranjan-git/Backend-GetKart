import express, { urlencoded } from "express";
import dbConnect from "./dbConnect.js";
import usersRouter from "./Routers/users.routers.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";

const server = express();

let PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors({ origin: "https://get-kart.netlify.app", credentials: true }));

server.use("/users", usersRouter);

dbConnect()
  .then(() => {
    console.log("DB connected...");
    try {
      server.listen(PORT, () => {
        console.log(`Server has started...`);
      });
    } catch (err) {
      console.log("Server Error : ", err);
    }
  })
  .catch((err) => {
    console.log("Database Error : ", err);
  });
