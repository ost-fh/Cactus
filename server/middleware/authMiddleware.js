import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("no authorization header");
    }
    if (!req.headers.authorization.startsWith("Bearer")) {
      throw new Error("invalid authorization header");
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("no token");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedToken.id).select("-password");

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ message: "unauthorized access" });
  }
};
