import mongoose from "mongoose";

interface TUser {
  email: string,
  password: string,
  name: string,
  products: Array<Object>
}

const userSchema: mongoose.Schema<TUser> = new mongoose.Schema<TUser>({
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