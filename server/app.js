import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { userRoutes } from "./routes/userRoutes.js";
import { libraryRoutes } from "./routes/libraryRoutes.js";
import { testingRoutes } from "./routes/testingRoutes.js";

export const app = express();

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", userRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/testlab", testingRoutes);

app.use(errorHandler);
