import express from "express";

const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import {
  getLibraries,
  postLibrary,
  getLibrary,
  postNewVersion,
} from "../controllers/libraryController";

router.get("/", getLibraries);

router.post("/", protect, postLibrary);

router.get("/:id/", getLibrary);

router.post("/:id/", protect, postNewVersion);

export const libraryRoutes = router;
