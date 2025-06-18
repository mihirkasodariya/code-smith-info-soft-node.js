const { Schema } = mongoose;
import Joi from 'joi';
import mongoose, { model } from "mongoose";
import { dbTableName } from "../utils/constants.js";

const inquirySchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    countryCode: { type: String, required: true },
    mobile: { type: String, required: true },
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isMark: { type: Boolean, default: false },
},
    { timestamps: true }
);

export const inquiryModel = model(dbTableName.INQUIRY, inquirySchema);

export const inquiryValidation = Joi.object({
    fname: Joi.string().min(2).max(50).required().messages({
        "string.base": "First name must be a string",
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters",
        "any.required": "First name is required"
    }),
    lname: Joi.string().min(2).max(50).required().messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters",
        "any.required": "Last name is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    type: Joi.string().required().messages({
        "string.empty": "Type is required",
        "any.required": "Type is required"
    }),
    countryCode: Joi.string().min(1).max(5).required().messages({
        "string.base": "Country code must be a string",
        "any.required": "Country code is required"
    }),
    mobile: Joi.string().pattern(/^[0-9]{7,15}$/).required().messages({
        "string.pattern.base": "Mobile must be a valid number with 7 to 15 digits",
        "string.empty": "Mobile number is required",
        "any.required": "Mobile number is required"
    }),
    message: Joi.string().min(5).required().messages({
        "string.empty": "Message is required",
        "string.min": "Message must be at least 5 characters long",
        "any.required": "Message is required"
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

const jobSchema = new mongoose.Schema({
    careerId: { type: Schema.Types.ObjectId, ref: dbTableName.CAREER, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    // type: { type: String, required: true },
    attach: { type: String, required: true },
    experienceYM: { type: String, required: true },
    currentSalary: { type: String, required: true },
    expectedSalary: { type: String, required: true },
    currentJobLocation: { type: String, required: true },
    // applyPosition: { type: String, required: true },
    isMark: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
},
    { timestamps: true }
);

export const jobModel = model(dbTableName.JOB_APPLICATION, jobSchema);

export const jobValidation = Joi.object({
    careerId: Joi.string().length(24).hex().required().messages({
        "string.base": "Career ID must be a string",
        "string.empty": "Career ID is required",
        "string.length": "Career ID must be exactly 24 characters",
        "string.hex": "Career ID must be a valid hexadecimal string",
        "any.required": "Career ID is required",
    }),
    name: Joi.string().min(2).max(50).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name must be at most 50 characters",
        "any.required": "Name is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    mobile: Joi.string().required().messages({
        "string.empty": "Phone number is required",
        "any.required": "Phone number is required"
    }),
    experienceYM: Joi.string().required().messages({
        "number.base": "Experience (years) must be a number",
        "any.required": "Experience (years) is required"
    }),
    currentSalary: Joi.string().required().messages({
        "string.empty": "Current salary is required",
        "any.required": "Current salary is required"
    }),
    expectedSalary: Joi.string().required().messages({
        "string.empty": "Expected salary is required",
        "any.required": "Expected salary is required"
    }),
    currentJobLocation: Joi.string().required().messages({
        "string.empty": "Current job location is required",
        "any.required": "Current job location is required"
    }),
    applyPosition: Joi.string().required().messages({
        "string.empty": "Apply Position is required",
        "any.required": "Apply Position is required"
    }),
    attach: Joi.string().required().messages({
        'string.base': 'Attachment must be a string.',
        'string.empty': 'Attachment is required.',
        'any.required': 'Please upload an attachment.',
    }),
});


const getInTouchSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    countryCode: { type: String, required: true },
    mobile: { type: String, required: true },
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isMark: { type: Boolean, default: false },
},
    { timestamps: true }
);

export const getInTouchModel = model(dbTableName.GET_IN_TOUCH, getInTouchSchema);

export const getInTouchValidation = Joi.object({
    fname: Joi.string().min(2).max(50).required().messages({
        "string.base": "First name must be a string",
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters",
        "any.required": "First name is required"
    }),
    lname: Joi.string().min(2).max(50).required().messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters",
        "any.required": "Last name is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    countryCode: Joi.string().required().messages({
        "string.empty": "Country Code is required",
        "any.required": "Country Code is required"
    }),
    mobile: Joi.string().pattern(/^[0-9]{7,15}$/).required().messages({
        "string.pattern.base": "Mobile must be a valid number with 7 to 15 digits",
        "string.empty": "Mobile number is required",
        "any.required": "Mobile number is required"
    }),
    message: Joi.string().min(5).required().messages({
        "string.empty": "Message is required",
        "string.min": "Message must be at least 5 characters long",
        "any.required": "Message is required"
    }),
    isActive: Joi.boolean().default(true),
});

const subscribeUserSchema = new Schema({
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const subscribeUserModel = model(dbTableName.SUBSCRIBE, subscribeUserSchema);

export const subscribeUserValidation = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required.',
        'string.email': 'Invalid email format.'
    }),
});