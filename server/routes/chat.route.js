import { Router } from "express";
import {
    addMembers,
    deleteChat,
    getChatDetails,
    getMessages,
    getMyChats,
    getMyGroups,
    leaveGroup,
    newGroupChat,
    removeMember,
    renameGroup,
    sendAttachments,
} from "../controllers/chat.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { attachmentMulter } from "../middlewares/multer.middleware.js";

import {
    addMemberValidator,
    chatIdValidator,
    newGroupValidator,
    removeMemberValidator,
    renameValidator,
    sendAttachmentsValidator,
    validateHandler,
} from "../lib/validators.js";

const router = Router();

// here user must be logged in to access the routes
router.use(isAuthenticated);

// New group chat
router.post("/new", newGroupValidator(), validateHandler, newGroupChat);
// Getting my own chats
router.get("/my", getMyChats);
// Getting my own created gruops
router.get("/my/groups", getMyGroups);
// Adding new member in the group
router.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
// Removing member from the group by creator
router.put(
    "/removeMember",
    removeMemberValidator(),
    validateHandler,
    removeMember
);
// Leaving the group
router.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// Send attachment
router.post(
    "/message",
    attachmentMulter,
    sendAttachmentsValidator(),
    validateHandler,
    sendAttachments
);
// Get messages
router.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// Get chat details, rename, delete
router
    .route("/:id")
    .get(chatIdValidator(), validateHandler, getChatDetails)
    .put(renameValidator(), validateHandler, renameGroup)
    .delete(chatIdValidator(), validateHandler, deleteChat);

export default router;
