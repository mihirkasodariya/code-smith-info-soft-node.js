import { galleryModel, galleryValidation, idValidation } from "../models/galleryModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addGallery = async (req, res) => {
    try {
        const files = req.files;
        const imagesToInsert = await Promise.all(
            files.map(async (file) => {
                const fileName = file.filename
                const { error } = galleryValidation.validate({ image: fileName });
                if (error) {
                    return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
                };
                return { image: fileName };
            }),
        );
        const saved = await galleryModel.insertMany(imagesToInsert);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_GALLERY, saved);
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllGallery = async (req, res) => {
    try {
        const gallery = await galleryModel.find({ isActive: true }).sort({ createdAt: -1 });
        const galleryWithPath = gallery.map((item) => ({
            ...item._doc,
            image: `/gallery/${item.image}`
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.GALLERY_LIST, galleryWithPath);
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteGallery(req, res) {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id: id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await galleryModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_GALLERY, {});
    } catch (error) {
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};