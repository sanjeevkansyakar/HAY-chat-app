import { envMode } from "../app.js";

// Throw error response
const errorMiddleware = (err, req, res, next) => {
    err.message ||= "Internal Server Error.";
    err.statusCode ||= 500;

    if (err.code === 11000) {
        err.message = `Duplicate field - ${Object.keys(err.keyPattern).join(
            ", "
        )}`;
        err.statusCode = 400;
    } else if (err.name === "CastError") {
        err.message = `Invalid format of ${err.path}`;
        err.statusCode = 400;
    }

    return res.status(err.statusCode).json({
        success: false,
        message: envMode === "DEVELOPMENT" ? err : err.message,
    });
};

// Handling the try catch handler
const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (error) {
        next(error);
    }
};

export { errorMiddleware, asyncHandler };
