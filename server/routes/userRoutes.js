import express from "express";
import { authLogin, authRegister, checkAddToCart, checkGetCartProduct, checkRemoveCart } from "../middlewares/userAuth.js";
import { addToCart, getCartProduct, getCurrentUser, login, register, removeCart } from "../controllers/user.cont.js";

const userRouter = express.Router();

userRouter.post("/register", authRegister, register);
userRouter.post("/login", authLogin, login);
userRouter.post("/getCurrentUser", getCurrentUser);
userRouter.post("/addCart", checkAddToCart, addToCart);
userRouter.post("/getCart", checkGetCartProduct, getCartProduct);
userRouter.post("/removeCart", checkRemoveCart, removeCart);

export default userRouter;