import express from "express";
import { checkAddProduct, checkChangeRole } from "../middlewares/sellerAuth.js";
import { changeRole } from "../controllers/seller.cont.js";
import { addProduct } from "../controllers/prod.cont.js";

const sellerRouter = express.Router();

sellerRouter.post("/becomeSeller", checkChangeRole, changeRole);

sellerRouter.post("/addProduct", checkAddProduct, addProduct);

export default sellerRouter;