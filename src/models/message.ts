import mongoose from "mongoose";

interface TMessage {
  message: string;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
}

const messageSchema = new mongoose.Schema<TMessage>(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
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
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
