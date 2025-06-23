'use strict'
export default class response {
    static success = (res, status, message, data) => {
        const response = {
            success: true,
            status: status,
            message: message || 'Success : Operation successful.',
            data: data || {},
        };
        return res.status(status || 200).json(response);
    };

    static error = (res, status, message, data) => {
        const response = {
            success: false,
            status: status || 403,
            message: message || 'Error : Request failed.',
            data: data || {},
        };
        return res.status(status || 200).json(response);
    };
};