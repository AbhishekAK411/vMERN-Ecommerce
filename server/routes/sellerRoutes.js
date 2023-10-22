import express from "express";
import { checkChangeRole } from "../middlewares/sellerAuth.js";
import { changeRole } from "../controllers/seller.cont.js";

const sellerRouter = express.Router();

sellerRouter.post("/becomeSeller", checkChangeRole, changeRole);

export default sellerRouter;