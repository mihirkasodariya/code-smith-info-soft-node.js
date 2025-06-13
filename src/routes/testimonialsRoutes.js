import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { testimonials } from "../utils/multer.js";
import {
    addTestimonials,
    getAllTestimonials,
    updateTestimonials,
    deleteTestimonials,
} from "../controllers/testimonialsController.js";

router.post("/addTestimonials", testimonials, validateAccessToken, addTestimonials);
router.get("/getAllTestimonials", getAllTestimonials);
router.put("/updateTestimonials/:id", validateAccessToken, updateTestimonials);
router.delete("/deleteTestimonials/:id", validateAccessToken, deleteTestimonials);

export default router;