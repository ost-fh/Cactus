import express from "express";

const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import postTestResult from "../controllers/testingController.js";

router.post("/", protect, postTestResult);

export const testingRoutes = router;
