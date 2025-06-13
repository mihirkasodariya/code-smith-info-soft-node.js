import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
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

export default router;