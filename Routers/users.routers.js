import express from "express";
import {
  Signup,
  Login,
  updateUser,
  getUser,
  Logout,
} from "../Controllers/users.controllers.js";
import auth from "../Middlewares/auth.middleware.js";

let Router = express.Router();

Router.post("/signup", Signup)
  .post("/login", Login)
  .patch("/updateUser", auth, updateUser)
  .get("/", auth, getUser)
  .post("/logout", auth, Logout);

export default Router;
