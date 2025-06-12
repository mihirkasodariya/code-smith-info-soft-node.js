import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
// import { blogImage } from "../utils/multer.js";
import {
    addTechStack,
    getAllTechStack,
    updateTechStack,
    deleteTechStack
} from "../controllers/techStackController.js";

router.post("/addTechStack", validateAccessToken, addTechStack);
router.get("/getAllTechStack", getAllTechStack);
router.put("/updateTechStack/:id", validateAccessToken, updateTechStack);
router.delete("/deleteTechStack/:id", validateAccessToken, deleteTechStack);

// // Trusted by Startups and Enterprises Worldwide
// router.post("/addEnterpriseLogo", homeEnterpriseLogo, validateAccessToken, addEnterpriseLogo);
// router.get("/getAllEnterpriseLogo", getAllEnterpriseLogo);
// router.delete("/deleteEnterpriseLogo/:id", validateAccessToken, deleteEnterpriseLogo);

// //Our Success Stories
// router.post("/addSuccessStoryImage", successStoryImage, validateAccessToken, addSuccessStoryImage);
// router.get("/getAllSuccessStoryImage", getAllSuccessStoryImage);
// router.delete("/deleteSuccessStoryImage/:id", validateAccessToken, deleteSuccessStoryImage);


export default router;