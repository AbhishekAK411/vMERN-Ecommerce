import express from "express";
import userRouter from "./userRoutes.js";
import sellerRouter from "./sellerRoutes.js";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/auth", sellerRouter);


export default router;