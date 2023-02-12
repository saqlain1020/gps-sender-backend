import { Router } from "express";
import { buyProduct, createProduct, getAllProducts } from "../controllers/productController";
import { check } from "express-validator";
import { validationMiddleware } from "../libs/middlewares";
import { protect } from "../controllers/userController";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post(
  "/",
  [
    check("name").exists().withMessage("Name is a required field"),
    check("price").exists().withMessage("Price is a required field"),
    check("days").exists().withMessage("Days is a required field"),
    check("price").isNumeric().withMessage("Price must be a number"),
    check("days").isNumeric().withMessage("Days must be a number"),
  ],
  validationMiddleware,
  createProduct
);
productRouter.post(
  "/buy",
  protect,
  [
    check("days").exists().withMessage("Days is a required field"),
    check("days").isNumeric().withMessage("Days must be a number"),
  ],
  buyProduct
);

export default productRouter;
