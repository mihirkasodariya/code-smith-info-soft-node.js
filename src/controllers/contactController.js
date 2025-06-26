import {
    inquiryModel,
    inquiryValidation,
    idValidation,
    jobModel,
    jobValidation,
    getInTouchModel,
    getInTouchValidation,
    subscribeUserModel,
    subscribeUserValidation,
} from '../models/contactModel.js';
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import sendMail from '../../config/mailer/index.js';

export const addBusinessInquiry = async (req, res) => {
    try {
        const { fname, lname, email, type, mobile, message } = req.body;

        const { error } = inquiryValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const inquiry = await inquiryModel.create({
            fname,
            lname,
            email,
            type,
            mobile,
            message,
        });
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

        const fullName = `${capitalize(fname)} ${capitalize(lname)}`;
        sendMail("business_inquiry", "Thanks for reaching out to CodeSmith InfoSoft LLP — we appreciate your interest!", email, {
            fullName: fullName,
            email: email,
            mobile: mobile,
            message: message,
            base_URL: process.env.BASE_URL,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_INQUIRY, inquiry);
    } catch (error) {
        console.error('Error in addBusinessInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllInquiries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { isActive: true };
        const sort = { createdAt: -1 };

        const [inquiries, totalRecords] = await Promise.all([
            inquiryModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
            inquiryModel.countDocuments(query),
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
        console.error('Error in getAllInquiries:', error);
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
        console.error('Error in getInquiry:', error);
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
        console.error('Error in markInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const addJobApplication = async (req, res) => {
    try {
        const { name, email, mobile, experienceYM, currentSalary, expectedSalary, currentJobLocation, careerId } = req.body;
        const attach = req.file?.filename;
        req.body.attach = attach;
        const { error } = jobValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const jobData = await jobModel.create({
            careerId,
            name,
            email,
            mobile,
            experienceYM,
            currentSalary,
            expectedSalary,
            currentJobLocation,
            attach,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_JOB, jobData);
    } catch (error) {
        console.error('Error in addJobApplication:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getJobApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const inquiry = await jobModel.findOne({ _id: id, isActive: true }).populate('careerId');
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.JOB_SINGLE, inquiry);
    } catch (error) {
        console.error('Error in getInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllJobApplication = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { isActive: true };
        const sort = { createdAt: -1 };

        const [allJobs, totalRecords] = await Promise.all([
            jobModel.find(query).populate('careerId').sort(sort).skip(skip).limit(limit).lean(),
            jobModel.countDocuments(query),
        ]);
        const totalPages = Math.ceil(totalRecords / limit);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.JOB_LIST, {
            page,
            limit,
            totalRecords,
            totalPages,
            records: allJobs,
        });
    } catch (error) {
        console.error('Error in getAllJobApplication:', error);
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
        console.error('Error in markJobApplication:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const addGetInTouch = async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;

        const { error } = getInTouchValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const getintouch = await getInTouchModel.create({
            name,
            email,
            mobile,
            message
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_GET_IN_TOUCH, getintouch);
    } catch (error) {
        console.error('Error in addGetInTouch:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getGetInTouch = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const inquiry = await getInTouchModel.findOne({ _id: id, isActive: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.INQUIRY_SINGLE, inquiry);
    } catch (error) {
        console.error('Error in getInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllGetInTouch = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { isActive: true };
        const sort = { createdAt: -1 };

        const [getintouch, totalRecords] = await Promise.all([
            getInTouchModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
            getInTouchModel.countDocuments(query),
        ]);
        const totalPages = Math.ceil(totalRecords / limit);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.INQUIRY_LIST, {
            page,
            limit,
            totalRecords,
            totalPages,
            records: getintouch,
        });
    } catch (error) {
        console.error('Error in getAllGetInTouch:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const markGetInTouch = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        await getInTouchModel.findByIdAndUpdate(id, { isMark: true }, { new: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.MARK_GET_IN_TOUCH, {});
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const addSubscribe = async (req, res) => {
    const { email } = req.body;
    const { error } = subscribeUserValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const alreadyExist = await subscribeUserModel.findOne({ email });
        if (alreadyExist) {
            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.SUBSCRIBE_SUCCESS, {});
        };
        sendMail("subscribe", "Welcome to CodeSmith InfoSoft! 🎉 Thanks for Subscribing.", email, {
            fullName: email,
            base_URL: process.env.BASE_URL
        });
        await subscribeUserModel.create({ email });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.SUBSCRIBE_SUCCESS, {});
    } catch (err) {
        console.error(err);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllSubscribe = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };
        const [subscribe, totalRecords] = await Promise.all([
            subscribeUserModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
            subscribeUserModel.countDocuments(query),
        ]);
        const totalPages = Math.ceil(totalRecords / limit);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.SUBSCRIBE_LIST, {
            page,
            limit,
            totalRecords,
            totalPages,
            records: subscribe,
        });
    } catch (error) {
        console.error('Error in getAllSubscribe:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
