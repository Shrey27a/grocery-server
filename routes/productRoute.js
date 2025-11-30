import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/authSeller.js";
import {
  addProduct,
  getProductById,
  getProducts,
  updateStock,
} from "../controllers/productController.js";

const productRouter = express.Router();
productRouter.post("/add", upload.array(["images"]), authSeller, addProduct);
productRouter.get("/list", getProducts);
productRouter.get("/id", getProductById);
productRouter.post("/stock", authSeller, updateStock);

export default productRouter;
