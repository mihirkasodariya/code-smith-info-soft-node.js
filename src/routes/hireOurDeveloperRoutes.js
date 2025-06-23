import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { hireOurDeveloper } from "../utils/multer.js";
import {
    addHireOurDeveloper,
    getAllHireOurDevelopers,
    getHireOurDeveloper,
    updateHireOurDevelopers,
    deleteHireOurDevelopers,
} from "../controllers/hireDeveloperController.js";

router.post("/addHireOurDeveloper", hireOurDeveloper, validateAccessToken, addHireOurDeveloper);
router.get("/getAllHireOurDevelopers", getAllHireOurDevelopers);
router.get("/getHireOurDeveloper/:id", validateAccessToken, getHireOurDeveloper);
router.put("/updateHireOurDevelopers/:id", hireOurDeveloper, validateAccessToken, updateHireOurDevelopers);
router.delete("/deleteHireOurDevelopers/:id", validateAccessToken, deleteHireOurDevelopers);

export default router;