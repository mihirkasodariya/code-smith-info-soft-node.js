import express from "express";
const router = express.Router();
import { validateAccessToken } from "../middleware/auth.js";
import { teamMember } from "../utils/multer.js";
import {
    addTeamMember,
    updateTeamMember,
    getAllTeamMember,
    getTeamMemberById,
    deleteTeamMember,
} from "../controllers/teamController.js";

router.post("/addTeamMember", validateAccessToken, teamMember, addTeamMember);
router.put("/updateTeamMember/:id", teamMember, validateAccessToken, updateTeamMember);
router.get('/getAllTeamMember', getAllTeamMember);
router.get('/getTeamMemberById/:id', validateAccessToken, getTeamMemberById);
router.delete('/deleteTeamMember/:id', validateAccessToken, deleteTeamMember);

export default router;

