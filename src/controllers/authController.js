import { authModel, authRegisterValidation, authLoginValidation } from "../models/authModel.js";
import { generateJWToken } from "../middleware/auth.js";
import response from "../utils/response.js";
import { hash, compare } from "bcrypt";
import { resStatusCode, resMessage } from "../utils/constants.js";

export async function register(req, res) {
    const { fullName, email, password } = req.body;
    const { error } = authRegisterValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
    };
    try {
        const userExists = await authModel.findOne({ email });
        if (userExists?.email) {
            return response.error(res, resStatusCode.CONFLICT, resMessage.USER_FOUND, {});
        };
        const hashedPassword = await hash(password, 10);
        const createNewUser = await authModel.create({ fullName, email, password: hashedPassword, });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.USER_REGISTER, { _id: createNewUser._id });
    } catch (error) {
        console.error('Error in register:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export async function login(req, res) {
    const { email, password } = req.body;
    const { error } = authLoginValidation.validate(req.body);
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message);
    };
    try {
        const user = await authModel.findOne({ email, isActive: true });
        if (!user) {
            return response.error(res, resStatusCode.FORBIDDEN, resMessage.USER_NOT_FOUND, {});
        };
        const validPassword = await compare(password, user.password);
        if (!validPassword) {
            return response.error(res, resStatusCode.UNAUTHORISED, resMessage.INCORRECT_PASSWORD, {});
        };
        const token = await generateJWToken({ _id: user._id });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.LOGIN_SUCCESS, { _id: user._id, token: token });
    } catch (error) {
        console.error('Error in login:', error)
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};