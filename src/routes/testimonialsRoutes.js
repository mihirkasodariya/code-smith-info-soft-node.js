import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { testimonials } from "../utils/multer.js";
import {
    addTestimonials,
    getAllTestimonials,
    getTestimonial,
    updateTestimonials,
    deleteTestimonials,
} from "../controllers/testimonialsController.js";

router.post("/addTestimonials", testimonials, validateAccessToken, addTestimonials);
router.get("/getAllTestimonials", getAllTestimonials);
router.put("/updateTestimonials/:id", testimonials, validateAccessToken, updateTestimonials);
router.get("/getTestimonial/:id", validateAccessToken, getTestimonial);
router.delete("/deleteTestimonials/:id", validateAccessToken, deleteTestimonials);

export default router;