import multer, { diskStorage } from 'multer';
import { mkdir } from "fs";
import path from 'path';

const homeBannerStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/banner';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'home-banner' + first4Chars + ext);
    },
});
export const homeBanner = multer({
    storage: homeBannerStorage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).single('image');


const homeEnterpriseLogoStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/enterpriseLogo';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'enterprise-logo' + first4Chars + ext);
    },
});
export const homeEnterpriseLogo = multer({
    storage: homeEnterpriseLogoStorage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).single('image');


const successStoryStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/successStory';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'success-story' + first4Chars + ext);
    },
});
export const successStoryImage = multer({
    storage: successStoryStorage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).single('image');


const blogStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/blog';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'blog-image' + first4Chars + ext);
    },
});
export const blogImage = multer({
    storage: blogStorage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).single('image');


const caseStudyStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/caseStudy';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'case-study' + first4Chars + ext);
    },
});
export const caseStudy = multer({
    storage: caseStudyStorage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).fields([
    { name: 'companyLogo', maxCount: 1 },
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
]);


const portfolioStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/portfolio';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'portfolio' + first4Chars + ext);
    },
});
export const portfolio = multer({
    storage: portfolioStorage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).fields([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
]);


const testimonialsStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/testimonials';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'testimonials' + first4Chars + ext);
    },
});
export const testimonials = multer({
    storage: testimonialsStorage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).single('image');


const aboutUSStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/aboutUS';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'about-us' + first4Chars + ext);
    },
});
export const aboutUS = multer({
    storage: aboutUSStorage,
}).fields([
    { name: 'mediaFile', maxCount: 4 },
]);


const jobApplicationPDFStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/jobApplication';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = file.originalname.split('.')[0].slice(0, 4);
        cb(null, Date.now() + '-attach' + name + ext);
    },
});
export const jobApplicationPDF = multer({
    storage: jobApplicationPDFStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf'];
        if (allowedTypes.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only PDF files are allowed.'));
    },
}).single('attach');


const galleryStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/gallery';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = file.originalname.split('.')[0].slice(0, 4);
        cb(null, Date.now() + '-gallery' + name + ext);
    },
});
export const gallery = multer({
    storage: galleryStorage,
    limits: { fileSize: 1 * 1024 * 1024 },
}).array('images', 10);


const teamMemberStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/teamMember';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = file.originalname.split('.')[0].slice(0, 4);
        cb(null, Date.now() + '-team-member' + name + ext);
    },
});
export const teamMember = multer({
    storage: teamMemberStorage,
    limits: { fileSize: 1 * 1024 * 1024 }
}).single('photo');


const hireOurDeveloperStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/hireOurDeveloper';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'hire-our-developer-logo' + first4Chars + ext);
    },
});
export const hireOurDeveloper = multer({
    storage: hireOurDeveloperStorage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}).single('logo');