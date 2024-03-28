import { Router } from "express";
import {
    acceptFriendRequest,
    getAllNotifications,
    getMyFriends,
    getMyProfile,
    login,
    logout,
    newUser,
    searchUser,
    sendFriendRequest,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { singleAvatar } from "../middlewares/multer.middleware.js";

import {
    acceptRequestValidator,
    loginValidator,
    registerValidator,
    sendRequestValidator,
    validateHandler,
} from "../lib/validators.js";

const app = Router();

// Register new user
app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

// After here user must be logged in to access the routes
app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);

app.put(
    "/sendrequest",
    sendRequestValidator(),
    validateHandler,
    sendFriendRequest
);

app.put(
    "/acceptrequest",
    acceptRequestValidator(),
    validateHandler,
    acceptFriendRequest
);

app.get("/notifications", getAllNotifications);

app.get("/friends", getMyFriends);

export default app;
