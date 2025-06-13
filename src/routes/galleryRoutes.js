import express from "express";
import { addGallery, getAllGallery, deleteGallery } from "../controllers/galleryController.js";
import { validateAccessToken } from "../middleware/auth.js";
import { gallery } from "../utils/multer.js";

const router = express.Router();

router.post("/addGallery", validateAccessToken, gallery, addGallery);
router.get("/getAllGallery", getAllGallery);
router.delete("/deleteGallery/:id", validateAccessToken, deleteGallery);


export default router;
