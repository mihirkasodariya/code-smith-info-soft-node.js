import {
    aboutUSModel,
    aboutUsValidate,
    idValidation,
} from "../models/aboutModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addAboutUS = async (req, res) => {
    try {
        const { type } = req.body;
        const files = req.files?.mediaFile || [];

        const { error } = aboutUsValidate.validate({
            mediaFile: files.map(file => ({ filename: file.filename })),
            type,
        });

        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        }
        if (type === 'video') {
            await aboutUSModel.updateMany({ type: 'video' }, { $set: { isActive: false } });
        }
        const createPromises = files.map((file) => {
            return aboutUSModel.create({
                mediaFile: file.filename,
                type,
                isActive: type === 'video' ? true : true
            });
        });

        const savedMedias = await Promise.all(createPromises);

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_MEDIA_FILE, savedMedias);
    } catch (error) {
        console.error('Error in addAboutUS:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};


export const getAllAboutUS = async (req, res) => {
    const { type } = req.params;
    try {
        const aboutUSList = await aboutUSModel.find({ isActive: true, type }).sort({ createdAt: -1 });
        const chnageImageResponse = aboutUSList.map((data) => ({
            ...data._doc,
            mediaFile: `/aboutUS/${data.mediaFile}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.MEDIA_FILE_LIST, chnageImageResponse);
    } catch (error) {
        console.error('Error in getAllAboutUS:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteAboutUS = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await aboutUSModel.findByIdAndUpdate(
            { _id: id },
            { $set: { isActive: false } },
            { new: false },
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_MEDIA_FILE, {});
    } catch (error) {
        console.error('Error in deleteAboutUS:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};