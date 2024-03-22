import Message from "../models/message";
import User from "../models/user";
import Product from "../models/product";
import { TError, catchError, throwError, validateBody } from "../utils/error";
import authenticated from "../middlewares/isAuth";
import type { Request, Response, NextFunction } from "express";

export async function getAllMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.userId;
  const anotherUser = req.query.anotherUser;
  const product = req.query.productId;

  try {
    let messages = await Message.find({
      sender: { $in: [user, anotherUser] },
      receiver: { $in: [user, anotherUser] },
      product: product,
    }).sort({createdAt: -1});

    res.status(200).json({ messages: messages });
  } catch (err) {
    catchError(err as TError, next);
  }
}

export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sender = req.userId;
  const receiver = req.body.receiver;
  const product = req.body.productId;
  const message = req.body.message;

  try {
    validateBody(req);// validate data pass through body

    const userReceiver = await User.findById(receiver);
    const productReceiver = await Product.findById(product);

    if (!userReceiver || !productReceiver) {
      throwError("Validation error of product or receiver Id", 404);
      return;
    }

    const messageSended = new Message({
      sender: sender,
      receiver: receiver,
      product: product,
      message: message,
    });

    await messageSended.save();

    res
      .status(201)
      .json({
        message: messageSended,
        sender: sender,
        receiver: receiver,
        product: product,
      });
  } catch (err) {
    catchError(err as TError, next);
  }
}
