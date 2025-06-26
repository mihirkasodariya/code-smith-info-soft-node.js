import {
    portfolioModel,
    portfolioValidation,
    idValidation,
} from "../models/PortfolioModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addPortfolio = async (req, res) => {
    const banner = req.files?.banner[0]?.filename || '';
    const image = req.files?.image?.[0]?.filename || '';
    req.body.banner = banner;
    req.body.image = image;
    const { techStackId, projectName, description, features } = req.body;

    const { error } = portfolioValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const newPortfolio = await portfolioModel.create({
            techStackId,
            projectName,
            description,
            features,
            banner,
            image,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_PORTFOLIO, newPortfolio);
    } catch (error) {
        console.error('Error in addPortfolio:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllPortfolio = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const sort = { createdAt: -1 };
        const query = { isActive: true };

        let portfolioData = [];
        let totalRecords = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;
            [portfolioData, totalRecords] = await Promise.all([
                portfolioModel.find(query).populate('techStackId', '_id name bgColor textColor').sort(sort).skip(skip).limit(limitNum).lean(),
                portfolioModel.countDocuments(query),
            ]);
            totalPages = Math.ceil(totalRecords / limitNum);
        } else {
            portfolioData = await portfolioModel.find(query).populate('techStackId', '_id name bgColor textColor').sort(sort).lean();
        };
        const techStackMap = new Map();
        const portfolio = portfolioData.map(data => {
            const { techStackId, image, banner, ...rest } = data;
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
                image: `/portfolio/${image}`,
                banner: `/portfolio/${banner}`,
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
                records: portfolio,
            } : { portfolio, techStacks };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.PORTFOLIO_LIST, responseData);
    } catch (error) {
        console.error('Error in getAllPortfolio:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updatePortfolio = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    req.files?.banner?.[0]?.filename && (updateData.banner = req.files.banner[0].filename);
    req.files?.image?.length && (updateData.image = req.files.image.map((f) => f.filename));
    try {
        await portfolioModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_PORTFOLIO, {});
    } catch (error) {
        console.error('Error in updatePortfolio:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deletePortfolio = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await portfolioModel.findByIdAndUpdate(
            { _id: id },
            { $set: { isActive: false } },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_PORTFOLIO, {});
    } catch (error) {
        console.error('Error in deletePortfolio:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const getPortfolioById = await portfolioModel.findById(id);
        const resData = {
            ...getPortfolioById._doc,
            image: `/portfolio/${getPortfolioById.image}`,
            banner: `/portfolio/${getPortfolioById.banner}`,
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.PORTFOLIO_SINGLE, resData);
    } catch (error) {
        console.error('Error in getPortfolioById:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};