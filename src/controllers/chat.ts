import Message from "../models/message";
import User from "../models/user";
import Chat from "../models/chat";
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

export async function getChats(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = req.userId;

  try {
    const chats = await Chat.find({ $or: [{user1: user}, {user2: user}]});

    res.status(200).json({chats: chats});
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

    const chat = await Chat.findOne({
      user1: { $in: [sender, receiver]},
      user2: { $in: [sender, receiver]},
      product: product,
    });

    if (!chat) {
      const newChat = new Chat({
        user1: sender, user2: receiver, product: product,
      });

      await newChat.save();
    }

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
