import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {
    return (
        <Link
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
            className="no-underline p-0 hover:bg-gray-200 flex flex-col"
        >
            <div
                className={cn(
                    "flex relative gap-4 items-center p-3",
                    sameSender ? "bg-black" : "",
                    sameSender ? "text-white" : ""
                )}
            >
                <AvatarCard avatar={avatar} />
                <div>
                    <h3>{name}</h3>
                    {newMessageAlert && (
                        <p className=" text-xs">
                            {newMessageAlert.count} New Message
                        </p>
                    )}
                </div>

                {isOnline && (
                    <div className="size-2.5 rounded-full bg-green-500 absolute top-1/2 right-4 -translate-y-1/2" />
                )}
            </div>
        </Link>
    );
};

export default memo(ChatItem);
