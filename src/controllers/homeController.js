import { homeBannerModel, homeBannerValidation, idHomeValidation } from "../models/homeModel.js";
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
    const { id } = req.params;
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