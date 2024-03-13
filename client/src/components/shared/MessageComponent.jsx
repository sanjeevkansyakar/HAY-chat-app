import { fileFormat } from "@/lib/features";
import { cn } from "@/lib/utils";
import moment from "moment";
import React, { memo } from "react";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message;

    const sameSender = sender?._id === user?._id;

    const timeAgo = moment(createdAt).fromNow();

    return (
        <div
            className={cn(
                "bg-white rounded p-2 w-fit",
                sameSender ? "self-end" : "self-start"
            )}
        >
            {!sameSender && (
                <p className="text-[#2694ab] font-semibold">{sender.name}</p>
            )}

            {content && <p>{content}</p>}

            {attachments.length > 0 &&
                attachments.map((attachment, index) => {
                    const url = attachment.url;
                    const file = fileFormat(url);

                    return (
                        <div key={index}>
                            <a href={url} target="_blank" download className="">
                                {RenderAttachment(file, url)}
                            </a>
                        </div>
                    );
                })}

            <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
    );
};

export default memo(MessageComponent);

// #2694ab
