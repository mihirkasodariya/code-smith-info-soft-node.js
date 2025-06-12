import { blogModel, blogValidation, idValidation } from "../models/blogModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export async function addBlog(req, res) {
    const image = req?.file?.filename;
    const { techStackId, title, description, details } = req.body;
    const { error } = blogValidation.validate({ techStackId, image, title, description, details });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addBlog = await blogModel.create({
            techStackId,
            image,
            title,
            details,
            description
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_BLOG, addBlog);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllBlog(req, res) {
    try {
        const getAllBlog = await blogModel.find({ isActive: true }).populate('techStackId', 'name');
        const chnageImageResponse = getAllBlog.map((blog) => {
            const { techStackId, image, ...rest } = blog._doc;
            return {
                ...rest,
                image: `/blog/${blog.image}`,
                techStackName: techStackId?.name,
                techStackId: techStackId?._id
            };
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.BLOG_LIST, chnageImageResponse);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteBlog(req, res) {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await blogModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_BLOG, {});
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};