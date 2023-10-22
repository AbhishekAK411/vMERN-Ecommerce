import express from "express";
import { checkAddProduct, checkChangeRole, checkEditProduct } from "../middlewares/sellerAuth.js";
import { changeRole } from "../controllers/seller.cont.js";
import { addProduct, deleteProduct, editProduct, getProduct } from "../controllers/prod.cont.js";

const sellerRouter = express.Router();

sellerRouter.post("/becomeSeller", checkChangeRole, changeRole);

sellerRouter.post("/addProduct", checkAddProduct, addProduct);
sellerRouter.post("/getProduct", getProduct);
sellerRouter.post("/updateProduct", checkEditProduct, editProduct);
sellerRouter.post("/deleteProduct", deleteProduct);

export default sellerRouter;