const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js";
import mongoose, { model } from "mongoose";
import Joi from 'joi';

const teamSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    linkedin: { type: String },
    instagram: { type: String },
    dribbble: { type: String },
    behance: { type: String },
    photo: { type: String, require: true },
    textColor: { type: String },
    bgColor: { type: String },
    isActive: { type: Boolean, default: true },
},
    { timestamps: true },
);

export const teamModel = model(dbTableName.TEAM, teamSchema);

export const teamValidation = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name must be less than or equal to 100 characters",
        "any.required": "Name is required"
    }),
    position: Joi.string().min(2).max(50).required().messages({
        "string.base": "Position must be a string",
        "string.empty": "Position is required",
        "string.min": "Position must be at least 2 characters",
        "any.required": "Position is required"
    }),
    linkedin: Joi.string().uri().optional().allow("").messages({
        "string.uri": "LinkedIn must be a valid URL"
    }),
    instagram: Joi.string().uri().optional().allow("").messages({
        "string.uri": "Instagram must be a valid URL"
    }),
    dribbble: Joi.string().uri().optional().allow("").messages({
        "string.uri": "Dribbble must be a valid URL"
    }),
    behance: Joi.string().uri().optional().allow("").messages({
        "string.uri": "Behance must be a valid URL"
    }),
    photo: Joi.string().required().messages({
        "string.uri": "Photo must be a valid URL"
    }),
    textColor: Joi.string().optional().messages({
        "string.pattern.base": "Text color must be a valid hex code (e.g. ffffff)"
    }),
    bgColor: Joi.string().optional().messages({
        "string.pattern.base": "Background color must be a valid hex code (e.g. 000000)"
    }),
});

export const idValidation = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        "any.required": "ID is required",
        "string.length": "Invalid ID format",
        "string.hex": "Invalid ID format",
    }),
});