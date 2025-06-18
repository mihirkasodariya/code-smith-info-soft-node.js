import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { caseStudy } from "../utils/multer.js";
import {
    addCaseStudy,
    getAllCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    getCaseStudyById,
} from "../controllers/caseStudyController.js";

router.post("/addCaseStudy", caseStudy, validateAccessToken, addCaseStudy);
router.get("/getAllCaseStudy", getAllCaseStudy);
router.get("/getCaseStudyById/:id", getCaseStudyById);
router.put("/updateCaseStudy/:id", validateAccessToken, updateCaseStudy);
router.delete("/deleteCaseStudy/:id", validateAccessToken, deleteCaseStudy);

export default router;