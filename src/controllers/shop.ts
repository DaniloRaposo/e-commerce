import { validateBody, catchError, throwError } from "../utils/error";
import Product from "../models/product";
import User from "../models/user";
import type { TError } from "../utils/error";
import type { Request, Response, NextFunction } from "express";

/**
 * Middleware that return all products available
 */
export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await Product.find();

    res.status(200).json({ products: products });
  } catch (err) {
    catchError(err as TError, next);
  }
}

/**
 * Middleware that get product data from an specific ID
 * ID is passed through the params
 */
export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const prodId = req.params.prodId;
    const product = await Product.findById(prodId);

    if (!product) {
      throwError("Product not found", 404);
      return;
    }

    res.status(200).json({ product: product });
  } catch (err) {
    catchError(err as TError, next);
  }
}

/**
 * Middleware to create new product
 */
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validateBody(req); // validate if there is any validation error

    const image = req.file;
    if (!image) {
      throwError("Validation error", 422);
      return;
    }

    const product = new Product({
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description,
      userId: req.userId,
      imageUrl: image.path,
    });

    const productSaved = await product.save();
    const user = await User.findById(req.body.userId);

    if (!user) {
      throwError("Problem to find user that create product in database", 404);
    }

    user?.products.push(productSaved._id);
    await user?.save();

    res.status(201).json({message: "product created", product: productSaved})
  } catch (err) {
    catchError(err as TError, next);
  }
}
