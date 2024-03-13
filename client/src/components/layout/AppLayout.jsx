import { sampleChats } from "@/constants/sampleData";
import React from "react";
import { useParams } from "react-router-dom";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const chatId = params.chatId;

        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault();
            console.log("Delete Chat ", _id, groupChat);
        };

        return (
            <>
                <Title />
                <Header />
                <div className="grid grid-cols-12 h-[calc(100vh-4rem)]">
                    <div className="h-full max-sm:hidden sm:col-span-4 md:col-span-3 overflow-auto">
                        <ChatList
                            chats={sampleChats}
                            chatId={chatId}
                            // newMessagesAlert={[
                            //     {
                            //         chatId,
                            //         count: 4,
                            //     },
                            // ]}
                            // onlineUsers={["1", "2"]}
                            handleDeleteChat={handleDeleteChat}
                        />
                    </div>
                    <div className="h-full col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-6">
                        <WrappedComponent {...props} />
                    </div>
                    <div className="h-full max-md:hidden md:col-span-4 lg:col-span-3 p-8 bg-gray-400">
                        <Profile />
                    </div>
                </div>
            </>
        );
    };
};

export default AppLayout;
