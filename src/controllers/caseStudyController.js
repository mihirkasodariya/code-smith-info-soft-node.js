import {
    caseStudyModel,
    caseStudyValidation,
    idValidation,
} from "../models/caseStudyModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { subscribeUserModel } from "../models/contactModel.js"
import sendMail from '../../config/mailer/index.js';

export const addCaseStudy = async (req, res) => {
    const companyLogo = req.files?.companyLogo?.[0]?.filename;
    const mainImage = req.files?.mainImage?.[0]?.filename;
    const typography = req.files?.typography?.[0]?.filename;
    const color = req.files?.color?.[0]?.filename;
    req.body.companyLogo = companyLogo;
    req.body.mainImage = mainImage;
    req.body.typography = typography;
    req.body.color = color;
    const { projectName, description, platform, duration, industry, problem, solution, tech, devProcess, challenges, conclusion } = req.body;

    const { error } = caseStudyValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const newCaseStudy = await caseStudyModel.create({
            projectName,
            description,
            platform,
            duration,
            industry,
            problem,
            solution,
            tech,
            devProcess,
            challenges,
            typography,
            color,
            conclusion,
            companyLogo,
            mainImage,
        });
        const subscribeList = await subscribeUserModel.find({ isActive: true })

        const shortDescription = description.split(" ").slice(0, 200).join(" ");
        await subscribeList.reduce(async (prevPromise, subscriber) => {
            await prevPromise;
            await sendMail("case_study", "📊 New Case Study Released by CodeSmith InfoSoft LLP - See What We Built!", subscriber.email, {
                title: projectName,
                mainImage: '/caseStudy/' + mainImage,
                description: shortDescription,
                base_URL: process.env.BASE_URL
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
        }, Promise.resolve());
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_CASE_STUDY, newCaseStudy);
    } catch (error) {
        console.error('Error in addCaseStudy:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllCaseStudy = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let caseStudies = [];
        let totalCount = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            [caseStudies, totalCount] = await Promise.all([
                caseStudyModel.find(query).sort(sort).skip(skip).limit(limitNum),
                caseStudyModel.countDocuments(query),
            ]);
            totalPages = Math.ceil(totalCount / limitNum);
            const formattedData = caseStudies.map(data => ({
                ...data._doc,
                companyLogo: `/caseStudy/${data.companyLogo}`,
                mainImage: `/caseStudy/${data.mainImage}`,
                typography: `/caseStudy/${data.typography}`,
                color: `/caseStudy/${data.color}`,
            }));
            return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CASE_STUDY_LIST, {
                page: pageNum,
                limit: limitNum,
                totalRecords: totalCount,
                totalPages,
                records: formattedData,
            });
        };
        caseStudies = await caseStudyModel.find(query).sort(sort);

        const formattedData = caseStudies.map(data => ({
            ...data._doc,
            companyLogo: `/caseStudy/${data.companyLogo}`,
            mainImage: `/caseStudy/${data.mainImage}`,
            typography: `/caseStudy/${data.typography}`,
            color: `/caseStudy/${data.color}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CASE_STUDY_LIST, formattedData);
    } catch (error) {
        console.error('Error in getAllCaseStudy:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateCaseStudy = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    req.files?.companyLogo?.[0]?.filename && (updateData.companyLogo = req.files.companyLogo[0].filename);
    req.files?.mainImage?.[0]?.filename && (updateData.mainImage = req.files.mainImage[0].filename);
    req.files?.typography?.[0]?.filename && (updateData.typography = req.files.typography[0].filename);
    req.files?.color?.[0]?.filename && (updateData.color = req.files.color[0].filename);
    try {
        await caseStudyModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_CASE_STUDY, {});
    } catch (error) {
        console.error('Error in updateCaseStudy:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getCaseStudyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const getCaseStudyById = await caseStudyModel.findById(id);
        const resData = {
            ...getCaseStudyById._doc,
            companyLogo: `/caseStudy/${getCaseStudyById.companyLogo}`,
            mainImage: `/caseStudy/${getCaseStudyById.mainImage}`,
            typography: `/caseStudy/${getCaseStudyById.typography}`,
            color: `/caseStudy/${getCaseStudyById.color}`,
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CASE_STUDY_SINGLE, resData);
    } catch (error) {
        console.error('Error in getCaseStudyById:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteCaseStudy = async (req, res) => {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
       await caseStudyModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_CASE_STUDY, {});
    } catch (error) {
        console.error('Error in deleteCaseStudy:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};