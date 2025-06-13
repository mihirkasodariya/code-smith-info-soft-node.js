import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { aboutUS } from "../utils/multer.js";
import {
    addAboutUS,
    getAllAboutUS,
    deleteAboutUS,

} from "../controllers/aboutController.js";

router.post("/addAboutUS", aboutUS, validateAccessToken, addAboutUS);
router.get("/getAllAboutUS/:type", getAllAboutUS);
router.delete("/deleteAboutUS/:id", validateAccessToken, deleteAboutUS);

export default router;