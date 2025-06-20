import { testimonialsModel, testimonialsValidate, idValidation } from "../models/testimonialsModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export async function addTestimonials(req, res) {
    const image = req.file?.filename || '';
    req.body.image = image;
    const { name, description, rating, bgColor, textColor } = req.body;
    const { error } = testimonialsValidate.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const newtestimonials = await testimonialsModel.create({
            name,
            description,
            rating,
            image,
            bgColor,
            textColor
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_TESTIMONIALS, newtestimonials);
    } catch (error) {
        console.error('Error in addTestimonials:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllTestimonials(req, res) {
    try {
        const trestimonialsList = await testimonialsModel.find({ isActive: true }).sort({ createdAt: -1 });
        const chnageImageResponse = trestimonialsList.map((data) => ({
            ...data._doc,
            image: `/trestimonials/${data.image}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TESTIMONIALS_LIST, chnageImageResponse);
    } catch (error) {
        console.error('Error in getAllTestimonials:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};;

export async function updateTestimonials(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    req.files?.image?.length && (updateData.image = req.files.image.map((f) => f.filename));
    try {
        await testimonialsModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_TESTIMONIALS, {});
    } catch (error) {
        console.error('Error in updateTestimonials:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteTestimonials(req, res) {
    const { id } = req.params;
    const { error } = idValidation.validate(id);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await testimonialsModel.findByIdAndUpdate(
            { _id: id },
            { $set: { isActive: false } },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_TESTIMONIALS, {});
    } catch (error) {
        console.error('Error in deleteTestimonials:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};