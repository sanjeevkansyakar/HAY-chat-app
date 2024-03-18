import { compare } from "bcrypt";
import { User } from "../models/user.model.js";

import { asyncHandler } from "../middlewares/error.middleware.js";
import { sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

// create a new user, store cookie and save it to database
const newUser = async (req, res) => {
    const { name, username, bio, password } = req.body;

    const avatar = {
        public_id: "agdshd",
        url: "basdb",
    };

    const user = await User.create({
        name,
        username,
        bio,
        password,
        avatar,
    });

    sendToken(res, user, 201, "User created successfully");
};

// Login user and save cookie
const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user)
        return next(
            new ErrorHandler("Invalid Username or Password creadential", 404)
        );

    const isMatchPassword = await compare(password, user.password);

    if (!isMatchPassword)
        return next(
            new ErrorHandler("Invalid Username or Password credentials", 404)
        );

    sendToken(res, user, 200, `Welcome back, ${user.name}`);
});

const getMyProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);

    return res.status(200).json({ success: true, user });
});

export { login, newUser, getMyProfile };
