import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
            chatId: "",
            count: 0,
        },
    ],
    handleDeleteChat,
}) => {
    return (
        <div className={`w-[${w}]`}>
            {chats?.map((data, index) => {
                const { avatar, _id, name, groupChat, members } = data;

                const newMessageAlert = newMessagesAlert.find(
                    (msg) => msg.chatId === _id
                );

                const isOnline = members?.some((member) =>
                    onlineUsers.includes(_id)
                );

                return (
                    <ChatItem
                        index={index}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        avatar={avatar}
                        name={name}
                        _id={_id}
                        key={_id}
                        groupChat={groupChat}
                        sameSender={chatId === _id}
                        handleDeleteChat={handleDeleteChat}
                    />
                );
            })}
        </div>
    );
};

export default ChatList;
