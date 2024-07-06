import express, { Router } from "express";
import { body } from "express-validator";
import * as userController from "../controllers/user";
import User from "../models/user";
import isAuth from "../middlewares/is-auth";

const router: Router = express.Router();

// User registration
router.post(
    "/register",
    [
        body("username")
            .isLength({ min: 8, max: 20 })
            .withMessage(
                "Username invalid, it should contain 8-20 alphanumeric letters and be unique."
            )
            .matches(
                /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
            )
            .withMessage(
                "Username invalid, it should contain 8-20 alphanumeric letters and be unique."
            )
            .not()
            .isEmpty(),
        body("email")
            .isEmail()
            .withMessage("Email must be valid.")
            .custom(async (value, _) => {
                return User.findOne({ email: value }).then(
                    (userDoc: unknown) => {
                        if (userDoc && userDoc instanceof User) {
                            return Promise.reject("E-mail address registered.");
                        }
                    }
                );
            })
            .normalizeEmail()
            .not()
            .isEmpty(),
        body("password")
            .trim()
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long.")
            .not()
            .isEmpty(),
        body("address1")
            .isLength({ min: 8, max: 50 })
            .withMessage("Address1 must be at least 8-50 characters long.")
            .not()
            .isEmpty(),
        body("address2")
            .isLength({ min: 8, max: 50 })
            .withMessage("Address2 must be at least 8-50 characters long.")
            .not()
            .isEmpty(),
        body("postcode")
            .isLength({ min: 4, max: 10 })
            .withMessage("postcode must be at least 4-10 characters long.")
            .not()
            .isEmpty(),
    ],
    userController.register
);

// User login
router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .withMessage("Email must be valid.")
            .normalizeEmail()
            .not()
            .isEmpty(),
        body("password")
            .trim()
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long.")
            .not()
            .isEmpty(),
    ],
    userController.login
);

// Fetch user details
router.get("/", isAuth, userController.getStatus);

export const UserRouter = (): express.Router => router;
