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
    addHireDeveloperInquiry,
    getAllHireDeveloperInquiry,
    getHireDeveloperInquiry,
    markHireDeveloperInquiry, 
} from "../controllers/hireDeveloperController.js";

router.post("/addHireOurDeveloper", hireOurDeveloper, validateAccessToken, addHireOurDeveloper);
router.get("/getAllHireOurDevelopers", getAllHireOurDevelopers);
router.get("/getHireOurDeveloper/:id", validateAccessToken, getHireOurDeveloper);
router.put("/updateHireOurDevelopers/:id", hireOurDeveloper, validateAccessToken, updateHireOurDevelopers);
router.delete("/deleteHireOurDevelopers/:id", validateAccessToken, deleteHireOurDevelopers);

router.post("/addHireDeveloperInquiry", addHireDeveloperInquiry);
router.get("/getAllHireDeveloperInquiry", validateAccessToken, getAllHireDeveloperInquiry);
router.get("/getHireDeveloperInquiry/:id", validateAccessToken, getHireDeveloperInquiry);
router.put('/markHireDeveloperInquiry/:id', validateAccessToken, markHireDeveloperInquiry);


export default router;