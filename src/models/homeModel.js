import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const homeBannerSchema = new Schema(
    {
        image: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);
export const homeBannerModel = model(dbTableName.HOME_BANNER, homeBannerSchema);

export const homeBannerValidation = Joi.object({
    image: Joi.string().required().messages({
        "string.base": "Image must be a string",
        "string.empty": "Image is required",
        "any.required": "Image is required",
    }),
});

export const idHomeValidation = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        "string.base": "ID must be a string",
        "string.empty": "ID is required",
        "string.length": "ID must be exactly 24 characters",
        "string.hex": "ID must be a valid hexadecimal string",
        "any.required": "ID is required",
    }),
});