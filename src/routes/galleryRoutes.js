import express from "express";
const router = express.Router();
import { validateAccessToken } from "../middleware/auth.js";
import { gallery } from "../utils/multer.js";
import {
    addGallery,
    getAllGallery,
    deleteGallery
} from "../controllers/galleryController.js";

router.post("/addGallery", validateAccessToken, gallery, addGallery);
router.get("/getAllGallery", getAllGallery);
router.delete("/deleteGallery/:id", validateAccessToken, deleteGallery);

export default router;
