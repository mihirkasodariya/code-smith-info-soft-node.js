import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { homeBanner, homeEnterpriseLogo, successStoryImage } from "../utils/multer.js";
import {
    addHomeBanner,
    getAllHomeBanner,
    deleteHomeBanner,
    addEnterpriseLogo,
    getAllEnterpriseLogo,
    deleteEnterpriseLogo,
    addSuccessStoryImage,
    deleteSuccessStoryImage,
    getAllSuccessStoryImage
} from "../controllers/homeController.js";

// hero banner
router.post("/addHomeBanner", homeBanner, validateAccessToken, addHomeBanner);
router.get("/getAllHomeBanner", getAllHomeBanner);
router.delete("/deleteHomeBanner/:id", validateAccessToken, deleteHomeBanner);

// Trusted by Startups and Enterprises Worldwide
router.post("/addEnterpriseLogo", homeEnterpriseLogo, validateAccessToken, addEnterpriseLogo);
router.get("/getAllEnterpriseLogo", getAllEnterpriseLogo);
router.delete("/deleteEnterpriseLogo/:id", validateAccessToken, deleteEnterpriseLogo);

//Our Success Stories
router.post("/addSuccessStoryImage", successStoryImage, validateAccessToken, addSuccessStoryImage);
router.get("/getAllSuccessStoryImage", getAllSuccessStoryImage);
router.delete("/deleteSuccessStoryImage/:id", validateAccessToken, deleteSuccessStoryImage);


export default router;