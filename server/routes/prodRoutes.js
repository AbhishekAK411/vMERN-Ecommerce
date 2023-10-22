import express from "express";
import { defaultProducts, getDefaultProducts } from "../controllers/prod.cont.js";
 
const productRouter = express.Router();

productRouter.get("/getProductJSON", defaultProducts);
productRouter.get("/getDefaultProducts", getDefaultProducts);

export default productRouter;