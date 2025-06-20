import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { successStoryImage } from "../utils/multer.js";
import {
    addSuccessStoryImage,
    deleteSuccessStoryImage,
    getAllSuccessStoryImage
} from "../controllers/successStoryController.js";

//Our Success Stories
router.post("/addSuccessStoryImage", successStoryImage, validateAccessToken, addSuccessStoryImage);
router.get("/getAllSuccessStoryImage", getAllSuccessStoryImage);
router.delete("/deleteSuccessStoryImage/:id", validateAccessToken, deleteSuccessStoryImage);

export default router;