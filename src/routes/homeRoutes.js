import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { homeBanner } from "../utils/multer.js";
import {
    addHomeBanner,
    getAllHomeBanner,
    deleteHomeBanner,
} from "../controllers/homeController.js";

// hero banner
router.post("/addHomeBanner", homeBanner, validateAccessToken, addHomeBanner);
router.get("/getAllHomeBanner", getAllHomeBanner);
router.delete("/deleteHomeBanner/:id", validateAccessToken, deleteHomeBanner);

export default router;