import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { homeEnterpriseLogo } from "../utils/multer.js";
import {
    addEnterpriseLogo,
    getAllEnterpriseLogo,
    deleteEnterpriseLogo,
} from "../controllers/enterpriseController.js";

// Trusted by Startups and Enterprises Worldwide
router.post("/addEnterpriseLogo", homeEnterpriseLogo, validateAccessToken, addEnterpriseLogo);
router.get("/getAllEnterpriseLogo", getAllEnterpriseLogo);
router.delete("/deleteEnterpriseLogo/:id", validateAccessToken, deleteEnterpriseLogo);


export default router;