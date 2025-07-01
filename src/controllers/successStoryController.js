import {
    idValidation,
    successStoryModel,
    successStoryValidation,
    typeValidation,
} from "../models/successStoryModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addSuccessStoryImage = async (req, res) => {
    const image = req?.file?.filename
    const type = req?.query?.type;
    const { error } = successStoryValidation.validate({ image, type });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addEnterpriseLogo = await successStoryModel.create({
            image,
            type,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_SUCCESS_STORY, addEnterpriseLogo);
    } catch (error) {
        console.error('Error in addSuccessStoryImage:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllSuccessStoryImage = async (req, res) => {
    const { type } = req?.query;
    const { error } = typeValidation.validate({ type });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const getAllSuccessStory = await successStoryModel.find({ isActive: true, type: type }).sort({ createdAt: -1 });
        const chnageImageResponse = getAllSuccessStory.map((image) => ({
            ...image._doc,
            image: `/successStory/${image.image}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.SUCCESS_STORY_LIST, chnageImageResponse);
    } catch (error) {
        console.error('Error in getAllSuccessStoryImage:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteSuccessStoryImage = async (req, res) => {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await successStoryModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false },
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_SUCCESS_STORY, {});
    } catch (error) {
        console.error('Error in deleteSuccessStoryImage:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};