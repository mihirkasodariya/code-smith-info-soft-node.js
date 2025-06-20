import { teamModel, teamValidation, idValidation } from "../models/teamModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addTeamMember = async (req, res) => {
    try {
        let photo = req?.file?.filename;
        req.body.photo = photo;
        const { name, position, linkedin, instagram, dribbble, behance, textColor, bgColor } = req.body;
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
        console.error('Error in addTeamMember:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function updateTeamMember(req, res) {
    const { id } = req?.params;
    const updateData = req.body;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await teamModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.UPDATE_TEAM, {});
    } catch (error) {
        console.error('Error in updateTeamMember:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllTeamMember = async (req, res) => {
    try {
        let teams = await teamModel.find({ isActive: true }).sort({ createdAt: -1 }).sort({ createdAt: -1 });
        teams = teams.map((item) => {
            if (item.photo) {
                item.photo = `/teamMember/${item.photo}`;
            };
            return item;
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TEAM_LIST, teams);
    } catch (error) {
        console.error('Error in getAllTeamMember:', error)
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
        console.log(team)
        if (team.photo) team.photo = `/teamMember/${team?.photo}`;
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.TEAM_SINGLE, team);
    } catch (error) {
        console.error('Error in getTeamMemberById:', error)
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
        console.error('Error in deleteTeamMember:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};
