import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { blogImage } from "../utils/multer.js";
import {
    addBlog,
    getAllBlog,
    deleteBlog,
} from "../controllers/blogController.js";

// hero banner
router.post("/addBlog", blogImage, validateAccessToken, addBlog);
router.get("/getAllBlog", getAllBlog);
router.delete("/deleteBlog/:id", validateAccessToken, deleteBlog);

// // Trusted by Startups and Enterprises Worldwide
// router.post("/addEnterpriseLogo", homeEnterpriseLogo, validateAccessToken, addEnterpriseLogo);
// router.get("/getAllEnterpriseLogo", getAllEnterpriseLogo);
// router.delete("/deleteEnterpriseLogo/:id", validateAccessToken, deleteEnterpriseLogo);

// //Our Success Stories
// router.post("/addSuccessStoryImage", successStoryImage, validateAccessToken, addSuccessStoryImage);
// router.get("/getAllSuccessStoryImage", getAllSuccessStoryImage);
// router.delete("/deleteSuccessStoryImage/:id", validateAccessToken, deleteSuccessStoryImage);


export default router;