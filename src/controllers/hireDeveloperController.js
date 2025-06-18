import { hireDeveloperModel, hireDeveloperValidation, idValidation } from "../models/hireDeveloperModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export async function addHireOurDeveloper(req, res) {
    const logo = req?.file?.filename;
    const { title, url } = req.body;
    const { error } = hireDeveloperValidation.validate({ logo, title, url });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addHireOurDeveloper = await hireDeveloperModel.create({
            logo,
            title,
            url
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_HIRE_OUR_DEVELOPER, addHireOurDeveloper);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function getAllHireOurDevelopers(req, res) {
    try {
        const hireDevelopersList = await hireDeveloperModel.find({ isActive: true });
        const chnageImageResponse = hireDevelopersList.map((data) => ({
            ...data._doc,
            logo: `/hireOurDeveloper/${data.logo}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.HIRE_OUR_DEVELOPER_LIST, chnageImageResponse);
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function updateHireOurDevelopers(req, res) {
    const { id } = req.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    const updateData = req.body;
    req.files?.image?.length && (updateData.image = req.files.image.map((f) => f.filename));
    try {
        await hireDeveloperModel.findByIdAndUpdate(
            { _id: id },
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_HIRE_OUR_DEVELOPER, {});
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function deleteHireOurDevelopers(req, res) {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await hireDeveloperModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_HIRE_OUR_DEVELOPER, {});
    } catch (error) {
        console.error(error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};