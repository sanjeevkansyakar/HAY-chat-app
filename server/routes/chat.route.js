import { Router } from "express";
import {
    addMembers,
    getMyChats,
    getMyGroups,
    newGroupChat,
    removeMember,
    leaveGroup,
    sendAttachments,
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages,
} from "../controllers/chat.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { attachmentMulter } from "../middlewares/multer.middleware.js";

const router = Router();

// After here user must be logged in to access the routes
router.use(isAuthenticated);

router.post("/new", newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMembers);
router.put("/removeMember", removeMember);
router.delete("/leave/:id", leaveGroup);

// Send attachment
router.post("/message", attachmentMulter, sendAttachments);
// Get messages
router.get("/message/:id", getMessages);

// Get chat details, rename, delete
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default router;
