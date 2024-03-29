import { Router } from "express";
import { body } from "express-validator";
import authenticated from "../middlewares/isAuth";
import { getAllMessages, getChats, sendMessage } from "../controllers/chat";

const router = Router();

// GET /chat/messages
router.get("/messages", authenticated, getAllMessages);

// GET /chat/chats
router.get("/chats", authenticated, getChats);

//POST /chat/message
router.post(
  "/message",
  authenticated,
  [
    body("receiver", "Invalid receiver id").notEmpty(),
    body("productId", "Invalid product id").notEmpty(),
    body("message", "Empty message").notEmpty(),
  ],
  sendMessage
);

export default router;
