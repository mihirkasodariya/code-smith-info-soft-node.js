import { caseStudyModel, caseStudyValidation, idValidation } from "../models/caseStudyModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { subscribeUserModel } from "../models/contactModel.js"
import sendMail from '../../config/mailer/index.js';

export async function addCaseStudy(req, res) {
    const companyLogo = req.files?.companyLogo?.[0]?.filename || '';
    const mainImage = req.files?.mainImage?.[0]?.filename || '';
    // const images = req.files?.images?.map((img) => img.filename) || [];
    req.body.companyLogo = companyLogo;
    req.body.mainImage = mainImage;
    // req.body.images = images;
    const { projectName, description, platform, duration, industry, problem, solution, tech, devProcess, challenges, color, typography, conclusion } = req.body;

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
            color,
            typography,
            conclusion,
            companyLogo,
            mainImage,
            // images,
        });
        const subscribeList = await subscribeUserModel.find({ isActive: true })

        const shortDescription = description.split(" ").slice(0, 200).join(" ");
        await subscribeList.reduce(async (prevPromise, subscriber) => {
            await prevPromise;

            await sendMail("case_study", "📊 New Case Study Released by CodeSmith InfoSoft - See What We Built!", subscriber.email, {
                title: projectName,
                mainImage: '/caseStudy/' + mainImage,
                description: shortDescription,
                base_URL: process.env.BASE_URL
            }
            );
            await new Promise(resolve => setTimeout(resolve, 3000));
        }, Promise.resolve());

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_CASE_STUDY, newCaseStudy);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllCaseStudy(req, res) {
    try {
        const caseStudyList = await caseStudyModel.find({ isActive: true });
        const chnageImageResponse = caseStudyList.map((data) => ({
            ...data._doc,
            companyLogo: `/caseStudy/${data.companyLogo}`,
            mainImage: `/caseStudy/${data.mainImage}`,
            // images: `/caseStudy/${data.images}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CASE_STUDY_LIST, chnageImageResponse);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function updateCaseStudy(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    req.files?.companyLogo?.[0]?.filename && (updateData.companyLogo = req.files.companyLogo[0].filename);
    req.files?.mainImage?.[0]?.filename && (updateData.mainImage = req.files.mainImage[0].filename);
    req.files?.images?.length && (updateData.images = req.files.images.map((f) => f.filename));
    try {
        await caseStudyModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_CASE_STUDY, {});
    } catch (error) {
        console.error(error);
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
        };
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.CASE_STUDY_SINGLE, resData);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteCaseStudy(req, res) {
    const id = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        caseStudyModel.findByIdAndUpdate(
            { _id: id },
            { $set: { isActive: false } },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_CASE_STUDY, {});
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};