import { techStackModel, techStackValidation, idValidation, updateTechStackValidation } from "../models/techStackModel.js";
import { blogModel } from "../models/blogModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export async function addTechStack(req, res) {
    const { name } = req.body;
    const { error } = techStackValidation.validate({ name });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const existsTechStack = await techStackModel.findOne({ name });
        if (existsTechStack) {
            return response.error(res, resStatusCode.CLIENT_ERROR, resMessage.TECH_STACK_NAME_EXISTS, {});
        };
        const addTechStack = await techStackModel.create({
            name
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_TECH_STACK, addTechStack);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllTechStack(req, res) {
    try {
        const getAllTechStack = await techStackModel.find({ isActive: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TECH_STACK_LIST, getAllTechStack);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function updateTechStack(req, res) {
    const { id } = req?.params;
    const { name } = req.body;
    const { error } = updateTechStackValidation.validate({ id, name });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await techStackModel.findByIdAndUpdate(
            id,
            { name },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_TECH_STACK, {});
    } catch (error) {
        console.error("Error deleting tech stack:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteTechStack(req, res) {
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
        console.error("Error deleting tech stack:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};