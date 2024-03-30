import jwt from "jsonwebtoken";

import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies["access-token"];

    if (!token)
        return next(new ErrorHandler("Please login to access this route", 401));

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken?._id;

    next();
};

const adminOnly = (req, _, next) => {
    const token = req.cookies["admin-token"];

    if (!token)
        return next(new ErrorHandler("Only Admin can access this route", 401));

    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched)
        return next(new ErrorHandler("Only Admin can access this route", 401));

    next();
};

export { isAuthenticated, adminOnly };
