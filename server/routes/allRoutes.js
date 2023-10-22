import express from "express";
import userRouter from "./userRoutes.js";
import sellerRouter from "./sellerRoutes.js";
import productRouter from "./prodRoutes.js";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/auth", sellerRouter);
router.use("/auth", productRouter);


export default router;