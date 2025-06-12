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