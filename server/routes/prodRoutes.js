import express from "express";
import { defaultProducts, getDefaultProducts, getSingleProduct } from "../controllers/prod.cont.js";
 
const productRouter = express.Router();

productRouter.get("/getProductJSON", defaultProducts);
productRouter.get("/getDefaultProducts", getDefaultProducts);
productRouter.post("/getSingleProduct", getSingleProduct);

export default productRouter;