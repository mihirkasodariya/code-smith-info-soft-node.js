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
    { timestamps: true },
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


const HireDeveloperInquirySchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        hiringDuration: { type: String, required: true },
        message: { type: String, required: true },
        service: { type: String, required: true },
        isMark: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);
export const HireDeveloperInquiryModel = model(dbTableName.HIRE_DEVELOPER_INQUIRY, HireDeveloperInquirySchema);

export const HireDeveloperInquiryValidation = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.base': 'Name must be a valid string.',
        'string.empty': 'Name is required.',
        'any.required': 'Name is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a valid string.',
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.',
    }),
    hiringDuration: Joi.string().required().messages({
        'string.base': 'Hiring duration must be a valid string.',
        'string.empty': 'Hiring duration is required.',
        'any.required': 'Hiring duration is required.',
    }),
    message: Joi.string().required().messages({
        'string.base': 'Message must be a valid string.',
    }),
    service: Joi.string().required().messages({
        'string.base': 'Service must be a valid string.',
        'string.empty': 'Service is required.',
        'any.required': 'Service is required.',
    }),
});
