import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const successStorySchema = new Schema(
    {
        image: { type: String, required: true },
        type: { type: String, enum: ['web', 'mobile'], required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);
export const successStoryModel = model(dbTableName.SUCCESS_STORY, successStorySchema);

export const successStoryValidation = Joi.object({
    image: Joi.string().required().messages({
        "string.base": "Success story image must be a string",
        "string.empty": "Success story image is required",
        "any.required": "Success story image is required",
    }),
    type: Joi.string().valid("web", "mobile").required().messages({
        "string.base": "Story type must be a string",
        "string.empty": "Story type is required",
        "any.required": "Story type is required",
        "any.only": "Story type must be either 'web' or 'mobile'",
    }),
});

export const typeValidation = Joi.object({
    type: Joi.string().valid("web", "mobile").required().messages({
        "string.base": "Type must be a string",
        "string.empty": "Type is required must be either 'web' or 'mobile'",
        "any.required": "Type is required must be either 'web' or 'mobile'",
        "any.only": "Type must be either 'web' or 'mobile'",
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