
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js";
import Joi from 'joi';
import mongoose, { model } from "mongoose";

const gallerySchema = new Schema({
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
},
    { timestamps: true }
);
export const galleryModel = model(dbTableName.GALLERY, gallerySchema);

export const galleryValidation = Joi.object({
    image: Joi.string().required().messages({
        "string.base": "Image path must be a string",
        "string.empty": "Image path is required",
        "any.required": "Image is required"
    })
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