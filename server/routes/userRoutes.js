import express from "express";
import { authLogin, authRegister, checkAddToCart } from "../middlewares/userAuth.js";
import { addToCart, getCurrentUser, login, register } from "../controllers/user.cont.js";

const userRouter = express.Router();

userRouter.post("/register", authRegister, register);
userRouter.post("/login", authLogin, login);
userRouter.post("/getCurrentUser", getCurrentUser);
userRouter.post("/addCart", checkAddToCart, addToCart);

export default userRouter;