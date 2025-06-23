import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const careerSchema = new Schema(
    {
        techStackId: { type: Schema.Types.ObjectId, ref: dbTableName.TECH_STACK_MASTER, required: true },
        jobTitle: { type: String, required: true },
        qualification: { type: String, required: true },
        location: { type: String, required: true },
        experience: { type: String, required: true },
        vacancy: { type: Number, required: true },
        ofcTime: { type: String, required: true },
        role: { type: [String], required: true },
        skills: { type: [String], required: true },
        benefits: { type: [String], required: true },
        isArchive: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);
export const careerModel = model(dbTableName.CAREER, careerSchema);

export const careerValidation = Joi.object({
    techStackId: Joi.string().length(24).hex().required().messages({
        "string.base": "TechStack ID must be a string",
        "string.empty": "TechStack ID is required",
        "string.length": "TechStack ID must be exactly 24 characters",
        "string.hex": "TechStack ID must be a valid hexadecimal string",
        "any.required": "techStack ID is required",
    }),
    jobTitle: Joi.string().required().messages({
        "any.required": "Job title is required",
        "string.base": "Job title must be a string",
    }),
    qualification: Joi.string().required().messages({
        "any.required": "Qualification  is required",
        "string.base": "Qualification  must be a string",
    }),
    location: Joi.string().required().messages({
        "any.required": "Location is required",
        "string.base": "Location must be a string",
    }),
    experience: Joi.string().required().messages({
        "any.required": "Experience is required",
        "string.base": "Experience must be a string",
    }),
    vacancy: Joi.number().required().messages({
        "any.required": "Vacancy is required",
        "number.base": "Vacancy must be a number",
    }),
    ofcTime: Joi.string().required().messages({
        "any.required": "Office time is required",
        "string.base": "Office time must be a string",
    }),
    role: Joi.array().items(Joi.string().required()).min(1).required().messages({
        "any.required": "Role is required",
        "array.base": "Role must be an array of strings",
        "array.min": "At least one role must be specified",
    }),
    skills: Joi.array().items(Joi.string().required()).min(1).required().messages({
        "any.required": "Skills are required",
        "array.base": "Skills must be an array of strings",
        "array.min": "At least one skill must be specified",
    }),
    benefits: Joi.array().items(Joi.string().required()).min(1).required().messages({
        "any.required": "Benefits are required",
        "array.base": "Benefits must be an array of strings",
        "array.min": "At least one benefit must be specified",
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