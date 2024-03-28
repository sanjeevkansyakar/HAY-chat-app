import { compare } from "bcrypt";

import { User } from "../models/user.model.js";
import { Request } from "../models/request.model.js";
import { Chat } from "../models/chat.model.js";

import { asyncHandler } from "../middlewares/error.middleware.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";

import { cookieOption, emitEvent, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { getOtherMember } from "../lib/helper.js";

// create a new user, store cookie and save it to database
const newUser = async (req, res) => {
    const { name, username, bio, password } = req.body;

    const avatar = {
        public_id: "agdshd",
        url: "basdb",
    };

    const user = await User.create({
        name,
        username,
        bio,
        password,
        avatar,
    });

    sendToken(res, user, 201, "User created successfully");
};

// Login user and save cookie
const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user)
        return next(
            new ErrorHandler("Invalid Username or Password creadential", 404)
        );

    const isMatchPassword = await compare(password, user.password);

    if (!isMatchPassword)
        return next(
            new ErrorHandler("Invalid Username or Password credentials", 404)
        );

    sendToken(res, user, 200, `Welcome back, ${user.name}`);
});

const getMyProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user);

    if (!user) return next(new ErrorHandler("User not found", 404));

    return res.status(200).json({ success: true, user });
});

const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("access-token", { ...cookieOption, magAge: 0 })
        .json({ success: true, message: "User logged out successfully" });
});

const searchUser = asyncHandler(async (req, res) => {
    const { name = "" } = req.query;

    // Finding all my chats
    const myChats = await Chat.find({ groupChat: false, members: req.user });

    // Extracting all users from my chats means friends or people I have chatted with
    const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

    // Finding all users except me and my friends
    const allUsersExceptMeAndFriends = await User.find({
        _id: { $nin: allUsersFromMyChats },
        name: { $regex: name, $options: "i" },
    });

    // Modified response
    const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
    }));

    return res.status(200).json({ success: true, users });
});

const sendFriendRequest = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;

    const request = await Request.findOne({
        $or: [
            {
                sender: req.user,
                receiver: userId,
            },
            {
                sender: userId,
                receiver: req.user,
            },
        ],
    });

    if (request) return next(new ErrorHandler("Request already sent", 400));

    await Request.create({
        sender: req.user,
        receiver: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId]);
    return res
        .status(200)
        .json({ success: true, message: "Friend request sent successfully" });
});

const acceptFriendRequest = asyncHandler(async (req, res, next) => {
    const { requestId, accept } = req.body;

    const request = await Request.findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name");

    if (!request) return next(new ErrorHandler("Request not found", 404));

    // if I am not receiver, it will throw error
    if (request.receiver._id.toString() !== req.user.toString())
        return next(
            new ErrorHandler(
                "You are not authorized to accept this request",
                401
            )
        );

    // request rejected
    if (!accept) {
        await request.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Friend Request Rejected",
        });
    }

    // if request accepted, Then created a chat with the members
    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender._id}-${request.receiver._id}`,
        }),
        request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: "Friend request accepted",
        senderId: request.sender._id,
    });
});

const getAllNotifications = asyncHandler(async (req, res, next) => {
    const request = await Request.find({ receiver: req.user }).populate(
        "sender",
        "name avatar"
    );

    const allRequests = request.map(({ _id, sender }) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
        },
    }));
    return res.status(200).json({
        success: true,
        allRequests,
    });
});

const getMyFriends = asyncHandler(async (req, res, next) => {
    const chatId = req.query.chatId;

    const chats = await Chat.find({
        members: req.user,
        groupChat: false,
    }).populate("members", "name avatar");

    const friends = chats.map(({ members }) => {
        const otherUser = getOtherMember(members, req.user);

        return {
            _id: otherUser._id,
            name: otherUser.name,
            avatar: otherUser.avatar.url,
        };
    });

    if (chatId) {
        const chat = await Chat.findById(chatId);

        const availableFriends = friends.map(
            (friend) => !chat.members.includes(friend._id)
        );
        return res.status(200).json({
            success: true,
            friends: availableFriends,
        });
    } else {
        return res.status(200).json({
            success: true,
            friends,
        });
    }
});

export {
    login,
    newUser,
    getMyProfile,
    logout,
    searchUser,
    sendFriendRequest,
    acceptFriendRequest,
    getAllNotifications,
    getMyFriends,
};
