// Throw error response
const errorMiddleware = (err, req, res, next) => {
    err.message ||= "Internal Server Error.";
    err.statusCode ||= 500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
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
