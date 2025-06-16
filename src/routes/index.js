import { Router } from "express";
import auth from "./authRoutes.js";
import home from "./homeRoutes.js";
import enterprise from "./enterpriseRoutes.js";
import successStory from "./successStoryRoutes.js";
import blog from "./blogRoutes.js";
import techStack from "./techStackRoutes.js";
import caseStudy from "./caseStudyRoutes.js";
import career from "./careerRoutes.js";
import portfolio from "./PortfolioRoutes.js";
import testimonials from "./testimonialsRoutes.js";
import contact from "./contactRoutes.js";
import about from "./aboutRoutes.js";
import gallery from "./galleryRoutes.js";
import team from "./teamRoutes.js";


const router = Router();
router.use("/auth", auth);
router.use("/home", home);
router.use("/enterprise", enterprise);
router.use("/successStory", successStory);
router.use("/blog", blog);
router.use("/techStack", techStack);
router.use("/caseStudy", caseStudy);
router.use("/career", career);
router.use("/portfolio", portfolio);
router.use("/testimonials", testimonials);
router.use("/contact", contact);
router.use("/about", about);
router.use("/gallery", gallery);
router.use("/team", team);

export default router;