import {
    teamModel,
    teamValidation,
    idValidation,
} from "../models/teamModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addTeamMember = async (req, res) => {
    try {
        let photo = req?.file?.filename;
        req.body.photo = photo;
        // const { name, position, linkedin, instagram, facebook, twitter, textColor, bgColor } = req.body;
        const { error } = teamValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const newTeam = await teamModel.create({
            ...req.body,
            photo,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_TEAM, newTeam);
    } catch (error) {
        console.error('Error in addTeamMember:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const updateTeamMember = async (req, res) => {
    const { id } = req?.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    req.file?.photo?.filename && (updateData.photo = req.file?.photo?.filename);
    try {
        await teamModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: false },
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_TEAM, {});
    } catch (error) {
        console.error('Error in updateTeamMember:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllTeamMember = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const isPaginated = page && limit;
        const query = { isActive: true };
        const sort = { createdAt: -1 };

        let teams = [];
        let totalRecords = 0;
        let totalPages = 0;

        if (isPaginated) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            [teams, totalRecords] = await Promise.all([
                teamModel.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
                teamModel.countDocuments(query),
            ]);
            totalPages = Math.ceil(totalRecords / limitNum);
        } else {
            teams = await teamModel.find(query).sort(sort).lean();
        };
        const formatted = teams.map(item => ({
            ...item,
            photo: item.photo ? `/teamMember/${item.photo}` : "",
        }));
        const responseData = isPaginated
            ? {
                page: parseInt(page),
                limit: parseInt(limit),
                totalRecords,
                totalPages,
                records: formatted,
            } : formatted;
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TEAM_LIST, responseData);
    } catch (error) {
        console.error('Error in getAllTeamMember:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        const team = await teamModel.findById(id);
        if (team.photo) team.photo = `/teamMember/${team?.photo}`;
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TEAM_SINGLE, team);
    } catch (error) {
        console.error('Error in getTeamMemberById:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = idValidation.validate({ id });
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        };
        await teamModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_TEAM, {});
    } catch (error) {
        console.error('Error in deleteTeamMember:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
