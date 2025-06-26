import {
    careerModel,
    careerValidation,
    idValidation,
} from "../models/careerModel.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import response from "../utils/response.js";

export const addCareer = async (req, res) => {
    const { techStackId, jobTitle, qualification, location, experience, vacancy, ofcTime, role, skills, benefits } = req.body;
    const { error } = careerValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const newCareer = await careerModel.create({
            techStackId,
            jobTitle,
            location,
            experience,
            vacancy,
            ofcTime,
            role,
            skills,
            benefits,
            qualification
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_CAREER, newCareer);
    } catch (error) {
        console.error('Error in addCareer:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllCareer = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const sort = { createdAt: -1 };
        const query = isPaginated ? { isActive: true, isArchive: false } : { isActive: true };

        let careerData = [];
        let totalRecords = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;
            [careerData, totalRecords] = await Promise.all([
                careerModel.find(query).populate('techStackId', '_id name bgColor textColor').sort(sort).skip(skip).limit(limitNum).lean(),
                careerModel.countDocuments(query),
            ]);
            totalPages = Math.ceil(totalRecords / limitNum);
        } else {
            careerData = await careerModel.find(query).populate('techStackId', '_id name bgColor textColor').sort(sort).lean();
        };
        const techStackMap = new Map();
        const career = careerData.map(data => {
            const { techStackId, ...rest } = data;
            if (techStackId?._id && !techStackMap.has(String(techStackId._id))) {
                techStackMap.set(String(techStackId._id), {
                    techStackId: techStackId._id,
                    techStackName: techStackId.name,
                    bgColor: techStackId.bgColor,
                    textColor: techStackId.textColor,
                });
            };
            return {
                ...rest,
                techStackId: techStackId?._id,
                techStackName: techStackId?.name,
                bgColor: techStackId?.bgColor,
                textColor: techStackId?.textColor,
            };
        });
        const techStacks = Array.from(techStackMap.values());
        const responseData = isPaginated
            ? {
                page: parseInt(page),
                limit: parseInt(limit),
                totalRecords,
                totalPages,
                records: career,
            } : { career, techStacks };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.PORTFOLIO_LIST, responseData);
    } catch (error) {
        console.error('Error in getAllCareer:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const adminGetAllCareer = async (req, res) => {
    try {
        const careers = await careerModel.find({ isActive: true }).populate('techStackId').sort({ createdAt: -1 });

        const data = careers.map(({ techStackId, ...rest }) => ({
            ...rest._doc,
            techStackId: techStackId?._id || null,
            techStackName: techStackId?.name || null,
            textColor: techStackId?.textColor || null,
            bgColor: techStackId?.bgColor || null
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CAREER_LIST, data);
    } catch (error) {
        console.error('Error in adminGetAllCareer:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateCareer = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await careerModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_CAREER, {});
    } catch (error) {
        console.error('Error in updateCareer:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const archiveCareer = async (req, res) => {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id: id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await careerModel.findByIdAndUpdate(
            { _id: id },
            { isArchive: true },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ARCHIVE_CAREER, {});
    } catch (error) {
        console.error('Error in archiveCareer:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteCareer = async (req, res) => {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id: id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await careerModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_CAREER, {});
    } catch (error) {
        console.error('Error in deleteCareer:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getCareerById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const getCareerById = await careerModel.findById(id);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CAREER_SINGLE, getCareerById);
    } catch (error) {
        console.error('Error in getCareerById:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};