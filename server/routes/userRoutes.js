import express from "express";
import { authLogin, authRegister } from "../middlewares/userAuth.js";
import { getCurrentUser, login, register } from "../controllers/user.cont.js";

const userRouter = express.Router();

userRouter.post("/register", authRegister, register);
userRouter.post("/login", authLogin, login);
userRouter.post("/getCurrentUser", getCurrentUser);

export default userRouter;