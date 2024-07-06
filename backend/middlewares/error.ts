import { ErrorRequestHandler } from "express";
import { ValidationError } from "express-validator";

// Custom error type for validation errors
export interface ValidError extends Error {
    data?: ValidationError[];
}

const errorHandler: ErrorRequestHandler = (
    err: Error | ValidError,
    _,
    res,
    _next
) => {
    // Get status code or return 500(Internal server error))
    const statusCode = res.statusCode ? res.statusCode : 500;
    // Print validation message to console and store in variable
    let details = [];
    if ("data" in err && err.data && err.data.length > 0) {
        for (let d of err.data) {
            details.push(d.msg);
            console.error(d);
        }
    }

    res.status(statusCode);
    // Error response
    res.json({
        success: false,
        message: details[0] || err.message,
    });
};

export default errorHandler;
