import jwt from "jsonwebtoken";

import { adminSecretKey } from "../app.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOption } from "../utils/features.js";

import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

const adminLogin = asyncHandler(async (req, res, next) => {
    const { secretKey } = req.body;

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched) return next(new ErrorHandler("Invalid Admin Key", 401));

    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    return res
        .status(200)
        .cookie("admin-token", token, {
            ...cookieOption,
            maxAge: 1000 * 60 * 15,
        })
        .json({
            success: true,
            message: "Authenticated Successfully, Welcome BOSS",
        });
});

const adminLogout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("admin-token")
        .json({ success: true, message: "Admin logged out successfully" });
});

const getAdminData = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
        admin: true,
    });
});

const allUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    const transformedUsers = await Promise.all(
        users.map(async ({ name, username, avatar, _id }) => {
            const [groups, friends] = await Promise.all([
                Chat.countDocuments({ groupChat: true, members: _id }),
                Chat.countDocuments({ groupChat: false, members: _id }),
            ]);
            return {
                _id,
                name,
                username,
                avatar: avatar.url,
                groups,
                friends,
            };
        })
    );

    return res.status(200).json({
        status: "success",
        users: transformedUsers,
    });
});

const allChats = asyncHandler(async (req, res) => {
    const chats = await Chat.find({})
        .populate("members", "name avatar")
        .populate("creator", "name avatar");

    const transformedChats = await Promise.all(
        chats.map(async ({ _id, name, groupChat, members, creator }) => {
            const totalMessages = await Message.countDocuments({ chat: _id });

            return {
                _id,
                name,
                groupChat,
                avatar: members.slice(0, 3).map((member) => member.avatar.url),
                members: members.map(({ _id, name, avatar }) => ({
                    _id,
                    name,
                    avatar: avatar.url,
                })),
                creator: {
                    name: creator?.name || "None",
                    avatar: creator?.avatar.url || "",
                },
                totalMembers: members.length,
                totalMessages,
            };
        })
    );

    return res.status(200).json({
        status: "success",
        chats: transformedChats,
    });
});

const allMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({})
        .populate("sender", "name avatar")
        .populate("chat", "groupChat");

    const transformedMessages = messages.map(
        ({ _id, attachments, content, sender, chat, createdAt }) => ({
            _id,
            attachments,
            content,
            createdAt,
            chat: chat._id,
            groupChat: chat.groupChat,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar.url,
            },
        })
    );

    return res.status(200).json({
        success: true,
        messages: transformedMessages,
    });
});

// Handler for fetching dashboard statistics.
const dashboardStats = asyncHandler(async (req, res) => {
    // Fetch counts of groups, users, messages, and total chats
    const [groupCount, usersCount, messagesCount, totalChatsCount] =
        await Promise.all([
            Chat.countDocuments({ groupChat: true }),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments(),
        ]);

    // Get today's date
    const today = new Date();

    // Get the date 7 days ago
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    // Fetch messages created in the last 7 days
    const last7DaysMessages = await Message.find({
        createdAt: {
            $gte: last7Days,
            $lte: today,
        },
    }).select("createdAt");

    // Calculate message distribution over the last 7 days
    const messages = new Array(7).fill(0); // Initialize array to store message counts
    const dayInMilliseconds = 1000 * 60 * 60 * 24;

    last7DaysMessages.forEach((message) => {
        // Calculate the index for the current message
        const indexApporx =
            (today.getTime() - message.createdAt.getTime()) / dayInMilliseconds;
        const index = Math.floor(indexApporx);

        // Increment the message count for the corresponding day
        messages[6 - index]++;
    });

    const stats = {
        groupCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChart: messages,
    };

    return res.status(200).json({
        success: true,
        stats,
    });
});

export {
    adminLogin,
    adminLogout,
    allUsers,
    allChats,
    allMessages,
    dashboardStats,
    getAdminData,
};
