import { Router } from "express";
import {
    adminLogin,
    adminLogout,
    allChats,
    allMessages,
    allUsers,
    dashboardStats,
    getAdminData,
} from "../controllers/admin.controller.js";

import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

router.get("/logout", adminLogout);

// Only Admin can Access these routes
router.use(adminOnly);

router.get("/", getAdminData);

router.get("/users", allUsers);
router.get("/chats", allChats);
router.get("/messages", allMessages);

router.get("/stats", dashboardStats);

export default router;
