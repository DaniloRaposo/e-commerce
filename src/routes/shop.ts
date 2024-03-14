import { Router } from "express";
import { body } from "express-validator";
import authenticated from "../middlewares/isAuth";
import { getProducts, getProduct, createProduct } from "../controllers/shop";

const router = Router();

// GET /shop/products
router.get("/products", authenticated, getProducts);

// GET /shop/product/:id
router.get("/product/:id", authenticated, getProduct);

// POST /shop/product
router.post(
  "/product",
  authenticated,
  [
    body("name", "Invalid Name").notEmpty(),
    body("price", "Invalid price").isNumeric(),
    body("description", "Invalid description").isLength({min: 6})
  ],
  createProduct
);

export default router;
