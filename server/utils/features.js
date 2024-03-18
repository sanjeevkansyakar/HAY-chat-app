import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOption = {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: false,
};

const connectDB = (url) => {
    mongoose
        .connect(url, { dbName: "hay!" })
        .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            throw err;
        });
};

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res.status(code).cookie("access-token", token, cookieOption).json({
        success: true,
        message,
    });
};

export { connectDB, sendToken };
