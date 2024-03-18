import { Router } from "express";
import {
    getMyProfile,
    login,
    newUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { singleAvatar } from "../middlewares/multer.middleware.js";

const app = Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

// After here user must be logged in to access the routes
app.get("/me", isAuthenticated, getMyProfile);

export default app;
