import {
    blogModel,
    blogValidation,
    idValidation,
} from "../models/blogModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { subscribeUserModel } from "../models/contactModel.js"
import sendMail from '../../config/mailer/index.js';
import { getAllActiveAdminEmails } from "../utils/commonFunctions.js"

export const addBlog = async (req, res) => {
    const image = req?.file?.filename;
    const { createdBy, techStackId, title, description, details } = req.body;
    const { error } = blogValidation.validate({ createdBy, techStackId, image, title, description, details });
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
            createdBy,
        });
        const adminEmails = await getAllActiveAdminEmails();

        const subscribers = await subscribeUserModel.find({ isActive: true }).select("email");
        const subscriberEmails = subscribers.map(sub => sub.email);
        const allRecipients = [...adminEmails, ...subscriberEmails];

        const shortDescription = description.split(" ").slice(0, 200).join(" ");
        const subject = "📊 New Blog Released by CodeSmith InfoSoft LLP - See What We Built!";

        sendMail("blog", subject, allRecipients, {
            title,
            mainImage: '/blog/' + image,
            description: shortDescription,
            base_URL: process.env.BASE_URL,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_BLOG, addBlog);
    } catch (error) {
        console.error('Error in addBlog:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllBlog = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let blogsData = [];
        let totalRecords = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            [blogsData, totalRecords] = await Promise.all([
                blogModel.find(query).populate('techStackId').sort(sort).skip(skip).limit(limitNum),
                blogModel.countDocuments(query)
            ]);
            totalPages = Math.ceil(totalRecords / limitNum);
        } else {
            blogsData = await blogModel.find(query).populate('techStackId').sort(sort);
        };
        const techStackMap = new Map();
        const blogs = blogsData.map(blog => {
            const { techStackId, image, ...rest } = blog._doc;
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
                image: `/blog/${image}`,
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
                records: blogs,
            } : { blogs, techStacks };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.BLOG_LIST, responseData);
    } catch (error) {
        console.error('Error in getAllBlog:', error);
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
        console.error('Error in getBlogById:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    const updateData = req.body;
    req.files?.image?.length && (updateData.image = req.files.image.map((f) => f.filename));
    try {
        await blogModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false, runValidators: true }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_BLOG, {});
    } catch (error) {
        console.error('Error in updateBlog:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteBlog = async (req, res) => {
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
        console.error('Error in deleteBlog:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};