import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import {
    addCareer,
    getAllCareer,
    adminGetAllCareer,
    updateCareer,
    archiveCareer,
    deleteCareer
} from "../controllers/careerController.js";

router.post("/addCareer", validateAccessToken, addCareer);
router.get("/getAllCareer", getAllCareer);
router.get("/adminGetAllCareer", validateAccessToken, adminGetAllCareer);
router.put("/updateCareer/:id", validateAccessToken, updateCareer);
router.put("/archiveCareer/:id", validateAccessToken, archiveCareer);
router.delete("/deleteCareer/:id", validateAccessToken, deleteCareer);

export default router;