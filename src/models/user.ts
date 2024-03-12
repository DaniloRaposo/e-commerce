import mongoose from "mongoose";

interface TUser {
  email: string,
  password: string,
  name: string,
  products: mongoose.Types.DocumentArray<mongoose.Types.ObjectId>,
}

const userSchema = new mongoose.Schema<TUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  products: [
    { type: mongoose.Schema.Types.ObjectId, required: true }
  ]
})

export default mongoose.model("User", userSchema);