import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const hireDeveloperSchema = new Schema(
    {
        logo: { type: String, required: true },
        title: { type: String, required: true },
        url: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);
export const hireDeveloperModel = model(dbTableName.HIRE_DEVELOPER, hireDeveloperSchema);

export const hireDeveloperValidation = Joi.object({
    logo: Joi.string().required().messages({
        "string.base": "Logo must be a string.",
        "string.empty": "Logo is required.",
        "any.required": "Logo is required.",
    }),
    title: Joi.string().required().messages({
        "string.base": "Title must be a string.",
        "string.empty": "Title is required.",
        "any.required": "Title is required.",
    }),
    url: Joi.string().uri().messages({
        "string.base": "URL must be a valid string.",
        "string.uri": "URL must be a valid link.",
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