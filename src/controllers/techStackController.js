import {
    techStackModel,
    techStackValidation,
    idValidation,
    updateTechStackValidation,
} from "../models/techStackModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { blogModel } from "../models/blogModel.js";

export const addTechStack = async (req, res) => {
    const { name, bgColor, textColor } = req.body;
    const { error } = techStackValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const existsTechStack = await techStackModel.findOne({ name });
        if (existsTechStack) {
            return response.error(res, resStatusCode.CLIENT_ERROR, resMessage.TECH_STACK_NAME_EXISTS, {});
        };
        const addTechStack = await techStackModel.create({
            name,
            bgColor,
            textColor,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_TECH_STACK, addTechStack);
    } catch (error) {
        console.error('Error in addTechStack:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllTechStack = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };
        const [techStacks, totalRecords] = await Promise.all([
            techStackModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
            techStackModel.countDocuments(query),
        ]);
        const totalPages = Math.ceil(totalRecords / limit);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TECH_STACK_LIST, {
            page,
            limit,
            totalRecords,
            totalPages,
            records: techStacks,
        });
    } catch (error) {
        console.error('Error in getAllTechStack:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateTechStack = async (req, res) => {
    const { id } = req?.params;
    req.body.id = id;
    const { error } = updateTechStackValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    const updateData = req.body;
    try {
        await techStackModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_TECH_STACK, {});
    } catch (error) {
        console.error('Error in updateTechStack:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteTechStack = async (req, res) => {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id: id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const associatedBlogs = await blogModel.findOne({ techStackId: id, isActive: true });
        if (associatedBlogs) {
            return response.error(res, resStatusCode.FORBIDDEN, resMessage.TECH_STACK_EXISTS_BLOG, {});
        };
        await techStackModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_TECH_STACK, {});
    } catch (error) {
        console.error('Error in deleteTechStack:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};