import {
    testimonialsModel,
    testimonialsValidate,
    idValidation,
} from "../models/testimonialsModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addTestimonials = async (req, res) => {
    const image = req.file?.filename || '';
    req.body.image = image;
    const { name, description, rating} = req.body;
    const { error } = testimonialsValidate.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const newtestimonials = await testimonialsModel.create({
            name,
            description,
            rating,
            image,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_TESTIMONIALS, newtestimonials);
    } catch (error) {
        console.error('Error in addTestimonials:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllTestimonials = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let testimonials = [];
        let totalRecords = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;
            [testimonials, totalRecords] = await Promise.all([
                testimonialsModel.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
                testimonialsModel.countDocuments(query),
            ]);
            totalPages = Math.ceil(totalRecords / limitNum);
        } else {
            testimonials = await testimonialsModel.find(query).sort(sort).lean();
        };
        const formatted = testimonials.map(data => ({
            ...data,
            image: `/testimonials/${data.image}`,
        }));
        const responseData = isPaginated
            ? {
                page: parseInt(page),
                limit: parseInt(limit),
                totalRecords,
                totalPages,
                records: formatted,
            } : formatted;
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TESTIMONIALS_LIST, responseData);
    } catch (error) {
        console.error('Error in getAllTestimonials:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
        };
        const getTestimonials = await testimonialsModel.findOne({ _id: id, isActive: true });
        const responseData = {
            ...getTestimonials._doc,
            image: `/testimonials/${getTestimonials?.image}`,
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TESTIMONIALS_SINGLE, responseData);
    } catch (error) {
        console.error('Error in getInquiry:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateTestimonials = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    req.file?.filename && (updateData.image = req.file.filename);
    try {
        await testimonialsModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_TESTIMONIALS, {});
    } catch (error) {
        console.error('Error in updateTestimonials:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteTestimonials = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await testimonialsModel.findByIdAndUpdate(
            { _id: id },
            { $set: { isActive: false } },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_TESTIMONIALS, {});
    } catch (error) {
        console.error('Error in deleteTestimonials:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};