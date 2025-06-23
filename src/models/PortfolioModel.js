import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const portfolioSchema = new Schema(
    {
        techStackId: { type: Schema.Types.ObjectId, ref: dbTableName.TECH_STACK_MASTER, required: true },
        projectName: { type: String, required: true },
        description: { type: String, required: true },
        banner: { type: String, required: true },
        image: { type: String, required: true },
        features: { type: [String], required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);
export const portfolioModel = model(dbTableName.PORTFOLIO, portfolioSchema);

export const portfolioValidation = Joi.object({
    techStackId: Joi.string().length(24).hex().required().messages({
        "string.base": "TechStack ID must be a string",
        "string.empty": "TechStack ID is required",
        "string.length": "TechStack ID must be exactly 24 characters",
        "string.hex": "TechStack ID must be a valid hexadecimal string",
        "any.required": "techStack ID is required",
    }),
    projectName: Joi.string().allow('', null).messages({
        'string.base': 'Project name must be a string.',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required.',
        'any.required': 'Description is required.',
    }),
    banner: Joi.string().required().messages({
        "string.base": "Banner must be a string.",
        "string.empty": "Banner is required.",
        "any.required": "Banner is required.",
    }),
    image: Joi.string().required().messages({
        "string.base": "Image must be a string.",
        "string.empty": "Image is required.",
        "any.required": "Image is required.",
    }),
    features: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.base': 'Features must be an array.',
        'array.min': 'At least one feature is required.',
        'any.required': 'Features are required.',
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