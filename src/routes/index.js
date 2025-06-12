import { Router } from "express";
import auth from "./authRoutes.js";
import home from "./homeRoutes.js";
import blog from "./blogRoutes.js";
import techStack from "./techStackRoutes.js";


const router = Router();
router.use("/auth", auth);
router.use("/home", home);
router.use("/blog", blog);
router.use("/techStack", techStack);

export default router;