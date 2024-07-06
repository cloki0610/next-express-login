import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document<string> {
    name: string;
    password?: string;
    email: string;
    address: string;
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "username is required!"],
            match: [
                /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
                "Username invalid, it should contain 8-20 alphanumeric letters and be unique.",
            ],
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required!"],
        },
        email: {
            type: String,
            unique: [true, "Email already exists!"],
            required: [true, "Email is required!"],
        },
        address1: {
            type: String,
            min: [8, "Address1 must be more than 8 characters."],
            max: [50, "Address1 cannot exceed 50 characters"],
        },
        address2: {
            type: String,
            min: [8, "Address must be more than 8 characters."],
            max: [50, "Address cannot exceed 50 characters"],
        },
        postcode: {
            type: String,
            min: [4, "Address must be more than 4 characters."],
            max: [10, "Address cannot exceed 10 characters"],
        },
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
