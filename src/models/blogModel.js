import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const blogSchema = new Schema(
    {
        techStackId: { type: Schema.Types.ObjectId, ref: dbTableName.TECH_STACK_MASTER, required: true },
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        details: [
            {
                _id: false,
                p: { type: String },
                h: { type: String }
            },
        ],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);
export const blogModel = model(dbTableName.BLOG, blogSchema);

export const blogValidation = Joi.object({
    techStackId: Joi.string().length(24).hex().required().messages({
        "string.base": "TechStack ID must be a string",
        "string.empty": "TechStack ID is required",
        "string.length": "TechStack ID must be exactly 24 characters",
        "string.hex": "TechStack ID must be a valid hexadecimal string",
        "any.required": "techStack ID is required",
    }),
    image: Joi.string().required().messages({
        "string.base": "Image must be a string.",
        "string.empty": "Image is required.",
        "any.required": "Image is required.",
    }),
    title: Joi.string().required().messages({
        "string.base": "Title must be a string.",
        "string.empty": "Title is required.",
        "any.required": "Title is required.",
    }),
    description: Joi.string().optional().messages({
        "string.base": "Description must be a string.",
    }),
    details: Joi.array().items(Joi.object({
        p: Joi.string().optional().messages({
            "string.base": "Paragraph (p) must be a string.",
        }),
        h: Joi.string().optional().messages({
            "string.base": "Heading (h) must be a string.",
        }),
    })).required().messages({
        "array.base": "Details must be an array of objects.",
        "any.required": "Details are required.",
    }),
});

export const idValidation = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        "string.base": "ID must be a string",
        "string.empty": "ID is required",
        "string.length": "ID must be exactly 24 characters",
        "string.hex": "ID must be a valid hexadecimal string",
        "any.required": "ID is required",
    }),
});