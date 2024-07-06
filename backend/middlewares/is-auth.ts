import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface TokenRequest extends Request {
    userId?: string;
}

export interface docodedPayload extends jwt.JwtPayload {
    userId: string;
}

export default (req: TokenRequest, res: Response, next: NextFunction) => {
    // Get parameters from the Authorization header
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        res.status(401);
        throw new Error("not authenticated.");
    }
    // Get token and varifications
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(
            token,
            process.env.LOGINSECRET!
        ) as docodedPayload;
    } catch (err) {
        res.status(500);
        throw err;
    }
    if (!decodedToken) {
        res.status(401);
        throw new Error("not authenticated.");
    }
    // Get user id from token and move to next step
    req.userId = decodedToken.userId;
    next();
};
