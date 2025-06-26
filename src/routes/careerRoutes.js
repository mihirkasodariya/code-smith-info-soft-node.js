import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import {
    addCareer,
    getAllCareer,
    updateCareer,
    archiveCareer,
    deleteCareer,
    getCareerById,
} from "../controllers/careerController.js";

router.post("/addCareer", validateAccessToken, addCareer);
router.get("/getAllCareer", getAllCareer);
router.put("/updateCareer/:id", validateAccessToken, updateCareer);
router.put("/archiveCareer/:id", validateAccessToken, archiveCareer);
router.delete("/deleteCareer/:id", validateAccessToken, deleteCareer);
router.get("/getCareerById/:id", getCareerById);

export default router;