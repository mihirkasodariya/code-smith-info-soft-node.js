import { inquiryModel, inquiryValidation, idValidation, jobModel, jobValidation } from '../models/contactModel.js';
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addBusinessInquiry = async (req, res) => {
    try {
        const { fname, lname, email, type, countryCode, mobile, message } = req.body;

        const { error } = inquiryValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const inquiry = await inquiryModel.create({
            fname,
            lname,
            email,
            type,
            countryCode,
            mobile,
            message
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_INQUIRY, inquiry);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await inquiryModel.find({ isActive: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.INQUIRY_LIST, inquiries);
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const inquiry = await inquiryModel.findOne({ _id: id, isActive: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.INQUIRY_SINGLE, inquiry);
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const markInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        await inquiryModel.findByIdAndUpdate(id, { isMark: true }, { new: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.MARK_INQUIRY, {});
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const addJobApplication = async (req, res) => {
    try {
        const { name, email, mobile, countryCode, type, experienceYM, currentSalary, expectedSalary, currentJobLocation, position } = req.body;
        const attach = req.file?.filename;
        req.body.attach = attach;
        const { error } = jobValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const jobData = await jobModel.create({
            name,
            email,
            mobile,
            countryCode,
            type,
            experienceYM,
            currentSalary,
            expectedSalary,
            currentJobLocation,
            position,
            attach
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_JOB, jobData);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllJobApplication = async (req, res) => {
    try {
        const allJobs = await jobModel.find({ isActive: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.JOB_LIST, allJobs);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const markJobApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        await jobModel.findByIdAndUpdate(id, { isMark: true }, { new: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.MARK_JOB, {});
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};