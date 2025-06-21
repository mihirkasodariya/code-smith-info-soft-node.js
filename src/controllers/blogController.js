import {
    blogModel,
    blogValidation,
    idValidation
} from "../models/blogModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { subscribeUserModel } from "../models/contactModel.js"
import sendMail from '../../config/mailer/index.js';

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
            description,
        });
        const subscribeList = await subscribeUserModel.find({ isActive: true })

        const shortDescription = description.split(" ").slice(0, 200).join(" ");
        await subscribeList.reduce(async (prevPromise, subscriber) => {
            await prevPromise;
            await sendMail("blog", "📊 New Blog Released by CodeSmith InfoSoft - See What We Built!", subscriber.email, {
                title: title,
                mainImage: '/blog/' + image,
                description: shortDescription,
                base_URL: process.env.BASE_URL,
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
        }, Promise.resolve());
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_BLOG, addBlog);
    } catch (error) {
        console.error('Error in addBlog:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllBlog(req, res) {
    try {
        const blogsData = await blogModel.find({ isActive: true }).populate('techStackId').sort({ createdAt: -1 });
        const { blogs, techStackMap } = blogsData.reduce(
            (acc, blog) => {
                const { techStackId, image, ...rest } = blog._doc;
                acc.blogs.push({
                    ...rest,
                    image: `/blog/${image}`,
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
                blogs: [],
                techStackMap: new Map(),
            },
        );
        const techStacks = Array.from(techStackMap.values());
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.BLOG_LIST, { blogs, techStacks });
    } catch (error) {
        console.error('Error in getAllBlog:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const getBlogById = await blogModel.findById(id);
        const resData = {
            ...getBlogById._doc,
            image: `/blog/${getBlogById.image}`,
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.BLOG_SINGLE, resData);
    } catch (error) {
        console.error('Error in getBlogById:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function updateBlog(req, res) {
    const { id } = req.params;
    const { error } = blogValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    const updateData = req.body;
    req.files?.image?.length && (updateData.image = req.files.image.map((f) => f.filename));
    try {
        await blogModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_BLOG, {});
    } catch (error) {
        console.error('Error in updateBlog:', error)
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
        console.error('Error in deleteBlog:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};