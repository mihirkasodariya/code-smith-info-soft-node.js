import express from "express";
import {
    addTeamMember,
    updateTeamMember,
    getAllTeamMember,
    getTeamMemberById,
    deleteTeamMember
} from "../controllers/teamController.js";
import { validateAccessToken } from "../middleware/auth.js";
import { teamMember } from "../utils/multer.js";

const router = express.Router();

router.post("/addTeamMember", validateAccessToken, teamMember, addTeamMember);
router.put("/updateTeamMember/:id", validateAccessToken, teamMember, updateTeamMember);
router.get('/getAllTeamMember', getAllTeamMember);
router.get('/getTeamMemberById/:id', validateAccessToken, getTeamMemberById);
router.delete('/deleteTeamMember/:id', validateAccessToken, deleteTeamMember);

export default router;

