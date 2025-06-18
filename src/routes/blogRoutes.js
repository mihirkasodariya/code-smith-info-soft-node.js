import { Router } from "express";
const router = Router();
import { validateAccessToken } from "../middleware/auth.js";
import { blogImage } from "../utils/multer.js";
import {
    addBlog,
    getAllBlog,
    deleteBlog,
    updateBlog,
    getBlogById
} from "../controllers/blogController.js";

router.post("/addBlog", blogImage, validateAccessToken, addBlog);
router.get("/getAllBlog", getAllBlog);
router.get("/getBlogById/:id", getBlogById);
router.delete("/deleteBlog/:id", validateAccessToken, deleteBlog);
router.delete("/updateBlog/:id", validateAccessToken, updateBlog);


export default router;