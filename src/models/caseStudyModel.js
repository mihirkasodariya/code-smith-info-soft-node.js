import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const caseStudySchema = new Schema(
    {
        companyLogo: { type: String, required: true },
        projectName: { type: String, required: true },
        description: { type: String, required: true },
        mainImage: { type: String, required: true },
        platform: { type: String, required: true },
        duration: { type: String, required: true },
        industry: { type: String, required: true },
        problem: { type: [String], required: true },
        solution: [
            {
                _id: false,
                h: { type: String },
                p: { type: String },
            },
        ],
        tech: { type: [String], required: true },
        devProcess: { type: [String], required: true },
        challenges: { type: [String], required: true },
        color: { type: String, required: true },
        typography: { type: String, required: true },
        // typography: [
        //     {
        //         _id: false,
        //         name: { type: String },
        //         cdn: { type: String },
        //     },
        // ],
        conclusion: { type: [String], required: true },
        isMobile: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);
export const caseStudyModel = model(dbTableName.CASE_STUDY, caseStudySchema);

export const caseStudyValidation = Joi.object({
    companyLogo: Joi.string().required().messages({
        'string.empty': 'Company logo is required.',
        'any.required': 'Company logo is required.',
    }),
    projectName: Joi.string().allow('', null).messages({
        'string.base': 'Project name must be a string.',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required.',
        'any.required': 'Description is required.',
    }),
    mainImage: Joi.string().required().messages({
        'string.empty': 'Main image is required.',
        'any.required': 'Main image is required.',
    }),
    platform: Joi.string().required().messages({
        'string.empty': 'Platform is required.',
        'any.required': 'Platform is required.',
    }),
    duration: Joi.string().required().messages({
        'string.empty': 'Duration is required.',
        'any.required': 'Duration is required.',
    }),
    industry: Joi.string().required().messages({
        'string.empty': 'Industry is required.',
        'any.required': 'Industry is required.',
    }),
    problem: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.base': 'Problem must be an array.',
        'array.min': 'At least one problem is required.',
        'any.required': 'Problem is required.',
    }),
    solution: Joi.array().items(Joi.object({
        h: Joi.string().allow('', null).messages({
            'string.base': 'Heading in solution must be a string.',
        }),
        p: Joi.string().allow('', null).messages({
            'string.base': 'Paragraph in solution must be a string.',
        }),
    })).messages({
        'array.base': 'Solution must be an array of objects.',
    }),
    tech: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.base': 'Tech name must be an array.',
        'array.min': 'At least one Tech name is required.',
        'any.required': 'Tech name is required.',
    }),
    devProcess: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.base': 'Development process must be an array.',
        'array.min': 'At least one development process item is required.',
        'any.required': 'Development process is required.',
    }),
    challenges: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.base': 'Challenges must be an array.',
        'array.min': 'At least one challenge is required.',
        'any.required': 'Challenges are required.',
    }),
    color: Joi.string().required().messages({
        'string.empty': 'Color image is required.',
        'any.required': 'Color image is required.',
    }),
    typography: Joi.string().required().messages({
        'string.empty': 'Typography image is required.',
        'any.required': 'Typography image is required.',
    }),
    isMobile: Joi.boolean().optional(),
    // color: Joi.array().items(Joi.string().messages({
    //     'string.pattern.base': 'Color must be a valid hex code.',
    // })).min(3).required().messages({
    //     'array.base': 'Color must be an array.',
    //     'array.min': 'At least one color is required.',
    //     'any.required': 'Color is required.',
    // }),
    // typography: Joi.array().items(Joi.object({
    //     name: Joi.string().required().messages({
    //         'string.empty': 'Typography name is required.',
    //         'any.required': 'Typography name is required.',
    //     }),
    //     cdn: Joi.string().uri().required().messages({
    //         'string.empty': 'Typography CDN is required.',
    //         'string.uri': 'CDN must be a valid URL.',
    //         'any.required': 'Typography CDN is required.',
    //     }),
    // })).messages({
    //     'array.base': 'Typography must be an array of objects.',
    // }),
    conclusion: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.base': 'Conclusion must be an array.',
        'array.min': 'At least one conclusion point is required.',
        'any.required': 'Conclusion is required.',
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