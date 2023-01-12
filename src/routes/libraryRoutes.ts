import express from "express";

const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import {
  getLibraries,
  postLibrary,
  getLibrary,
  postNewVersion,
  rescoreLibrary,
} from "../controllers/libraryController";

router.get("/", getLibraries);

router.post("/", protect, postLibrary);

router.get("/:id/", getLibrary);

router.get("/:id/score", protect, rescoreLibrary);

router.post("/:id/", protect, postNewVersion);

export const libraryRoutes = router;