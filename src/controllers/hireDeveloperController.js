import {
    hireDeveloperModel,
    hireDeveloperValidation,
    idValidation,
} from "../models/hireDeveloperModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

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
    req.files?.image?.length && (updateData.image = req.files.image.map((f) => f.filename));
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
    const { id } = req?.params;
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