import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
