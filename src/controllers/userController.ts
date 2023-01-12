import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // input valitation
  if (!username || !email || !password) {
    res.status(400);
    res.json({ message: "invalid data" });
    return;
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    res.json({ message: "User already exists" });
    return;
  }

  // salt & hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    console.log(`POST user: ${user.username} registered`);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400);
    res.json({ message: "Invalid user Data" });
    return;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // input validation
  if (!username || !password) {
    res.status(400);
    res.json({ message: "Invalid data" });
    return;
  }

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log(`LOGIN for ${user.username} succeeded`);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400);
    res.json({ message: "Invalid credentials" });
  }
};

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "2d" });
};
