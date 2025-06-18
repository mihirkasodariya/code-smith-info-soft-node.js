import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { portfolio } from "../utils/multer.js";
import {
    addPortfolio,
    getAllPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById
} from "../controllers/portfolioController.js";

router.post("/addPortfolio", portfolio, validateAccessToken, addPortfolio);
router.get("/getAllPortfolio", getAllPortfolio);
router.put("/updatePortfolio/:id", validateAccessToken, updatePortfolio);
router.delete("/deletePortfolio/:id", validateAccessToken, deletePortfolio);
router.get("/getPortfolioById/:id", getPortfolioById);

export default router;