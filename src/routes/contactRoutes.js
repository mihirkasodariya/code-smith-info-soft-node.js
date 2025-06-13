import express from 'express';
import { addBusinessInquiry, getAllInquiries, getInquiry, markInquiry, addJobApplication, getAllJobApplication, markJobApplication } from '../controllers/contactController.js';
import { validateAccessToken } from "../middleware/auth.js";
import { jobApplicationPDF } from '../utils/multer.js';

const router = express.Router();

router.post('/addBusinessInquiry', addBusinessInquiry);
router.get('/getAllInquiries', getAllInquiries);
router.get('/getInquiry/:id', validateAccessToken, getInquiry);
router.put('/markInquiry/:id', validateAccessToken, markInquiry);


router.post('/addJobApplication', jobApplicationPDF, addJobApplication);
router.get('/getAllJobApplication', getAllJobApplication);
router.put('/markJobApplication/:id', validateAccessToken, markJobApplication);

export default router;