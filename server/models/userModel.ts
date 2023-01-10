import mongoose from "mongoose";

export interface IUserSchema {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
