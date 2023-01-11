import express from "express";

const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import postTestResult from "../controllers/testingController";

router.post("/", protect, postTestResult);

export const testingRoutes = router;
