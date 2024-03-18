import jwt from "jsonwebtoken";

import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies["access-token"];

    if (!token)
        return next(new ErrorHandler("Please login to access this route", 401));

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken?._id;

    next();
};

export { isAuthenticated };
