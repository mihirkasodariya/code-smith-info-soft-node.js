import {
    hireDeveloperModel,
    hireDeveloperValidation,
    idValidation,
    HireDeveloperInquiryModel,
    HireDeveloperInquiryValidation,
} from "../models/hireDeveloperModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import sendMail from '../../config/mailer/index.js';
import { getAllActiveAdminEmails } from "../utils/commonFunctions.js"

export const addHireOurDeveloper = async (req, res) => {
    const logo = req?.file?.filename;
    const { title, url } = req.body;
    const { error } = hireDeveloperValidation.validate({ logo, title, url });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addHireOurDeveloper = await hireDeveloperModel.create({
            logo,
            title,
            url,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_HIRE_OUR_DEVELOPER, addHireOurDeveloper);
    } catch (error) {
        console.error('Error in addHireOurDeveloper:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getHireOurDeveloper = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const getHireOurDeveloper = await hireDeveloperModel.findOne({ _id: id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.HIRE_OUR_DEVELOPER_SINGLE, getHireOurDeveloper);
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllHireOurDevelopers = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let developers = [];
        let totalRecords = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;
            [developers, totalRecords] = await Promise.all([
                hireDeveloperModel.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
                hireDeveloperModel.countDocuments(query),
            ]);
            totalPages = Math.ceil(totalRecords / limitNum);
        } else {
            developers = await hireDeveloperModel.find(query).sort(sort).lean();
        };
        const formatted = developers.map(data => ({
            ...data,
            logo: `/hireOurDeveloper/${data.logo}`,
        }));
        const responseData = isPaginated
            ? {
                page: parseInt(page),
                limit: parseInt(limit),
                totalRecords,
                totalPages,
                records: formatted,
            } : formatted;
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.HIRE_OUR_DEVELOPER_LIST, responseData);
    } catch (error) {
        console.error('Error in getAllHireOurDevelopers:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateHireOurDevelopers = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    const updateData = req.body;
    req.file?.filename && (updateData.logo = req.file.filename);
    try {
        await hireDeveloperModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false },
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_HIRE_OUR_DEVELOPER, {});
    } catch (error) {
        console.error('Error in updateHireOurDevelopers:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteHireOurDevelopers = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await hireDeveloperModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false },
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_HIRE_OUR_DEVELOPER, {});
    } catch (error) {
        console.error('Error in deleteHireOurDevelopers:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const addHireDeveloperInquiry = async (req, res) => {
    try {
        const { name, email, hiringDuration, message, service } = req.body;

        const { error } = HireDeveloperInquiryValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const inquiry = await HireDeveloperInquiryModel.create({
            name,
            email,
            hiringDuration,
            message,
            service
        });
        const adminEmailSend = await getAllActiveAdminEmails();
        const allRecipients = [email, ...adminEmailSend];
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        const fullName = capitalize(name);
        const subject = `Thanks for Reaching Out – We’ve Received Your ${service} Request!`;
        sendMail("hire_developer_request", subject, allRecipients, {
            fullName,
            email,
            hiringDuration,
            service,
            message,
            base_URL: process.env.BASE_URL,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_INQUIRY, inquiry);
    } catch (error) {
        console.error('Error in addBusinessInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllHireDeveloperInquiry = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { isActive: true };
        const sort = { createdAt: -1 };

        const [inquiries, totalRecords] = await Promise.all([
            HireDeveloperInquiryModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
            HireDeveloperInquiryModel.countDocuments(query),
        ]);
        const totalPages = Math.ceil(totalRecords / limit);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.INQUIRY_LIST, {
            page,
            limit,
            totalRecords,
            totalPages,
            records: inquiries,
        });
    } catch (error) {
        console.error('Error in getAllHireDeveloperInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getHireDeveloperInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const inquiry = await HireDeveloperInquiryModel.findOne({ _id: id, isActive: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.INQUIRY_SINGLE, inquiry);
    } catch (error) {
        console.error('Error in getHireDeveloperInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
export const markHireDeveloperInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        await HireDeveloperInquiryModel.findByIdAndUpdate(id, { isMark: true }, { new: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.MARK_INQUIRY, {});
    } catch (error) {
        console.error('Error in markHireDeveloperInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};