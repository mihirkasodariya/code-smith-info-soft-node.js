import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const aboutUSSchema = new Schema(
    {
        mediaFile: { type: String, required: true },
        type: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);
export const aboutUSModel = model(dbTableName.ABOUT_US, aboutUSSchema);

export const aboutUsValidate = Joi.object({
    mediaFile: Joi.array().items(Joi.object({
        filename: Joi.string().required().messages({
            "string.base": "Filename must be a string.",
            "any.required": "Filename is required in mediaFile.",
        }),
    })).min(1).required().messages({
        "array.base": "mediaFile must be an array.",
        "array.min": "At least one media file is required.",
        "any.required": "mediaFile is required.",
    }),
    type: Joi.string().valid("image", "video").required().messages({
        "any.only": "Type must be either 'image' or 'video'.",
        "any.required": "Type is required.",
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