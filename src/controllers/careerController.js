import { careerModel, careerValidation, idValidation } from "../models/careerModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export async function addCareer(req, res) {
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
        console.error('Error in addCareer:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllCareer(req, res) {
    try {
        const getAllCareer = await careerModel.find({ isActive: true, isArchive: false }).populate('techStackId').sort({ createdAt: -1 });
        const { career, techStackMap } = getAllCareer.reduce(
            (acc, data) => {
                const { techStackId, ...rest } = data._doc;
                acc.career.push({
                    ...rest,
                    techStackId: techStackId?._id,
                    techStackName: techStackId?.name,
                    bgColor: techStackId?.bgColor,
                    textColor: techStackId?.textColor,
                });
                if (techStackId?._id && !acc.techStackMap.has(String(techStackId._id))) {
                    acc.techStackMap.set(String(techStackId._id), {
                        techStackId: techStackId?._id,
                        techStackName: techStackId?.name,
                        bgColor: techStackId?.bgColor,
                        textColor: techStackId?.textColor,
                    });
                };
                return acc;
            },
            {
                career: [],
                techStackMap: new Map(),
            },
        );
        const techStacks = Array.from(techStackMap.values());
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.PORTFOLIO_LIST, { career, techStacks });
    } catch (error) {
        console.error('Error in getAllCareer:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function adminGetAllCareer(req, res) {
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
        console.error('Error in adminGetAllCareer:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function updateCareer(req, res) {
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
        console.error('Error in updateCareer:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function archiveCareer(req, res) {
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
        console.error('Error in archiveCareer:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteCareer(req, res) {
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
        console.error('Error in deleteCareer:', error)
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
        console.error('Error in getCareerById:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};