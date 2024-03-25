import mongoose from "mongoose";

interface TChat {
  user1: mongoose.Types.ObjectId;
  user2: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
}

const chatSchema = new mongoose.Schema<TChat>(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
);

export default mongoose.model("Chat", chatSchema);
