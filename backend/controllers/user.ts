import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import type { ValidError } from "../middlewares/error";
import type { TokenRequest, docodedPayload } from "../middlewares/is-auth";

// @desc Register a new user
// @route POST /user/register
// @access Public
export const register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: ValidError = new Error("invalid register input.");
            error.data = errors.array();
            res.status(422);
            throw error;
        }
        // Get input from request bodys
        const { username, email, password, address1, address2, postcode } =
            req.body;
        try {
            // Create new user record
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                username,
                password: hashedPassword,
                address1,
                address2,
                postcode,
            });
            const result = await user.save();
            // Response
            res.status(201).json({
                success: true,
                message: "user successfully signed up.",
                userId: result._id,
            });
        } catch (err) {
            next(err);
        }
        res.json({ success: false, message: "something went wrong." });
    }
);

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: ValidError = new Error("login input invalid.");
            error.data = errors.array();
            res.status(422);
            throw error;
        }
        const { email, password }: { email: string; password: string } =
            req.body;
        try {
            // Find user
            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                res.status(401);
                throw new Error("user not found.");
            }
            // Check password
            const isEqual = await bcrypt.compare(password, user.password!);
            if (!isEqual) {
                res.status(401);
                throw new Error("incorrect password.");
            }
            if (process.env.LOGINSECRET) {
                // Create a new token
                const token = jwt.sign(
                    {
                        email: email,
                        userId: user._id.toString(),
                        username: user.username,
                    },
                    process.env.LOGINSECRET,
                    { expiresIn: "3d" }
                );
                // Response
                res.status(200).json({
                    success: true,
                    token,
                    userId: user._id.toString(),
                    message: user.username,
                });
            } else {
                throw new Error("environment variable is empty.");
            }
        } catch (err) {
            next(err);
        }
    }
);

// @desc    Get user status
// @route   GET /user
// @access  Private
export const getStatus = asyncHandler(
    async (req: TokenRequest, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                const error = new Error("user not found.");
                res.status(404);
                next(error);
            }
            res.status(200).json({
                success: true,
                user,
            });
        } catch (err) {
            next(err);
        }
    }
);
