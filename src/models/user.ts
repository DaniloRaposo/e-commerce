import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
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
    { type: Object }
  ]
})

export default mongoose.model("User", userSchema);