'use strict'
import jwt from "jsonwebtoken";
import { authModel } from "../models/authModel.js";

export const generateJWToken = async (payload) => {
    try {
        const secret = process.env.JWT_SECRET;
        const signOptions = {
            issuer: "tracking",
            expiresIn: "30d",
        };
        payload.creationDateTime = Date.now();
        const token = jwt.sign(payload, secret, signOptions);
        return token;
    } catch (error) {
        console.error("Generate JWT Token Error:", error.message);
        return error;
    };
};

export const validateAccessToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization || req.headers.Authorization;

        if (!token) {
            return res.status(401).json({ success: false, status: 401, message: "No token provided!" });
        };
        const secret = process.env.JWT_SECRET;
        const verifyOptions = {
            issuer: "tracking",
            expiresIn: "30d",
        };
        const decodedToken = jwt.verify(token, secret, verifyOptions);

        const rootUser = await authModel.findById({ _id: decodedToken._id });
        if (!rootUser) {
            return res.status(401).json({ success: false, status: 401, message: "Unauthorized User" });
        };
        req.user = rootUser;
        console.log("ADMIN ID : ", req.user.id);
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({ success: false, status: 401, message: "Invalid or Expired Token" });
    };
};

export const validateAboutUSFiles = (req, res, next) => {
    const files = req.files?.mediaFile || [];

    const invalidFile = files.find((file) => {
        const isImage = file.mimetype.startsWith('image/');
        const isVideo = file.mimetype.startsWith('video/');
        if (isImage && file.size > 1 * 1024 * 1024) return true;
        if (isVideo && file.size > 100 * 1024 * 1024) return true;
        return false;
    });
    if (invalidFile) {
        const sizeLimit = invalidFile.mimetype.startsWith('image/') ? '1MB' : '100MB';
        return res.status(400).json({
            success: false,
            message: `${invalidFile.originalname} exceeds ${sizeLimit} limit.`,
            data: {}
        });
    };
    next();
};
