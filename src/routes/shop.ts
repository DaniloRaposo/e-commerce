import { Router } from "express";
import { body } from "express-validator";
import {getProducts, getProduct, createProduct} from "../controllers/shop";

const router = Router();

// GET /shop/products
router.get("/products", getProducts);

// GET /shop/product/:id
router.get("/product/:id", getProduct);

// POST /shop/product
router.post("/product", [body()], createProduct);