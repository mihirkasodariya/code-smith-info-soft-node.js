import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const homeEnterpriseLogoSchema = new Schema(
    {
        image: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);
export const homeEnterpriseModel = model(dbTableName.HOME_ENTERPRISE_LOGO, homeEnterpriseLogoSchema);

export const enterpriseLogoValidation = Joi.object({
    image: Joi.string().required().messages({
        "string.base": "Image must be a string",
        "string.empty": "Image is required",
        "any.required": "Image is required",
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