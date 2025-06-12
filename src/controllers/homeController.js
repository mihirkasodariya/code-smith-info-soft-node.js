import { homeBannerModel, homeBannerValidation, idHomeValidation, homeEnterpriseModel, successStoryModel, successStoryValidation, typeValidation } from "../models/homeModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export async function addHomeBanner(req, res) {
    const image = req?.file?.filename
    const { error } = homeBannerValidation.validate({ image });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addBanner = await homeBannerModel.create({
            image
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_BANNER, addBanner);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllHomeBanner(req, res) {
    try {
        const homeBannerList = await homeBannerModel.find({ isActive: true });
        const chnageImageResponse = homeBannerList.map((banner) => ({
            ...banner._doc,
            image: `/banner/${banner.image}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.BANNER_LIST, chnageImageResponse);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteHomeBanner(req, res) {
    const { id } = req?.params;
    const { error } = idHomeValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await homeBannerModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_BANNER, {});
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function addEnterpriseLogo(req, res) {
    const image = req?.file?.filename
    const { error } = homeBannerValidation.validate({ image });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addEnterpriseLogo = await homeEnterpriseModel.create({
            image
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_ENTERPRISE_LOGO, addEnterpriseLogo);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllEnterpriseLogo(req, res) {
    try {
        const getAllLogo = await homeEnterpriseModel.find({ isActive: true });
        const chnageLogoResponse = getAllLogo.map((logo) => ({
            ...logo._doc,
            image: `/enterpriseLogo/${logo.image}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.LOGO_LIST, chnageLogoResponse);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteEnterpriseLogo(req, res) {
    const { id } = req?.params;
    const { error } = idHomeValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await homeEnterpriseModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_LOGO, {});
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function addSuccessStoryImage(req, res) {
    const image = req?.file?.filename
    const type = req?.query?.type;
    const { error } = successStoryValidation.validate({ image, type });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addEnterpriseLogo = await successStoryModel.create({
            image,
            type
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_SUCCESS_STORY, addEnterpriseLogo);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllSuccessStoryImage(req, res) {
    const { type } = req?.query;
    const { error } = typeValidation.validate({ type });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const getAllSuccessStory = await successStoryModel.find({ isActive: true, type: type });
        const chnageImageResponse = getAllSuccessStory.map((image) => ({
            ...image._doc,
            image: `/successStory/${image.image}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.SUCCESS_STORY_LIST, chnageImageResponse);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteSuccessStoryImage(req, res) {
    const { id } = req?.params;
    const { error } = idHomeValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await successStoryModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_SUCCESS_STORY, {});
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
