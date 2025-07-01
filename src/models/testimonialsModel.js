import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const testimonialsSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: String, required: true },
        image: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);
export const testimonialsModel = model(dbTableName.TESTIMONIALS, testimonialsSchema);

export const testimonialsValidate = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required.",
        "string.base": "Name must be a string.",
        "string.empty": "Name cannot be empty."
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required.",
        "string.base": "Description must be a string.",
        "string.empty": "Description cannot be empty."
    }),
    rating: Joi.string().required().messages({
        "any.required": "Rating is required.",
        "string.base": "Rating must be a string.",
        "string.empty": "Rating cannot be empty."
    }),
    image: Joi.string().required().messages({
        "any.required": "Image is required.",
        "string.base": "Image must be a string.",
        "string.empty": "Image cannot be empty."
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