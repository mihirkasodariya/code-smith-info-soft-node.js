import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const techStackSchema = new Schema(
    {
        name: { type: String, required: true },
        bgColor: { type: String, required: true },
        textColor: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);
export const techStackModel = model(dbTableName.TECH_STACK_MASTER, techStackSchema);

export const techStackValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "techStack Name must be a string.",
        "string.empty": "techStack Name is required.",
        "any.required": "techStack Name is required.",
    }),
    bgColor: Joi.string().required().messages({
        "string.base": "Background color must be a string.",
        "string.empty": "Background color is required.",
        "any.required": "Background color is required.",
    }),
    textColor: Joi.string().required().messages({
        "string.base": "Text color must be a string.",
        "string.empty": "Text color is required.",
        "any.required": "Text color is required.",
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

export const updateTechStackValidation = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        "string.base": "ID must be a string",
        "string.empty": "ID is required",
        "string.length": "ID must be exactly 24 characters",
        "string.hex": "ID must be a valid hexadecimal string",
        "any.required": "ID is required",
    }),
    name: Joi.string().required().messages({
        "string.base": "techStack Name must be a string.",
        "string.empty": "techStack Name is required.",
        "any.required": "techStack Name is required.",
    }),
    bgColor: Joi.string().required().messages({
        "string.base": "Background color must be a string.",
        "string.empty": "Background color is required.",
        "any.required": "Background color is required.",
    }),
    textColor: Joi.string().required().messages({
        "string.base": "Text color must be a string.",
        "string.empty": "Text color is required.",
        "any.required": "Text color is required.",
    }),
});