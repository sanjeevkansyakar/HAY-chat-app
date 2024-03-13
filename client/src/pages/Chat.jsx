import FileMenu from "@/components/dialogs/FileMenu";
import AppLayout from "@/components/layout/AppLayout";
import MessageComponent from "@/components/shared/MessageComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sampleMessage } from "@/constants/sampleData";
import { Paperclip, Send } from "lucide-react";
import React from "react";
import { useRef } from "react";

const user = {
    _id: "jhasdgaj",
    name: "Sanju K",
};

const Chat = () => {
    const containerRef = useRef(null);
    return (
        <>
            <div
                ref={containerRef}
                className="box-border flex flex-col p-4 space-y-4 bg-[#f7f7f7] h-[90%] overflow-x-hidden overflow-y-auto"
            >
                {sampleMessage.map((i) => (
                    <MessageComponent key={i._id} message={i} user={user} />
                ))}
            </div>

            <form className="h-[10%]">
                <div className="h-full flex p-4 items-center relative gap-2">
                    <Button
                        variant="secondary"
                        className="absolute left-6 bg-transparent hover:bg-transparent"
                        size="icon"
                    >
                        <Paperclip />
                    </Button>

                    <Input
                        className="w-full h-full border-none outline-none px-12 bg-[#f7f7f7]"
                        placeholder="Type message here..."
                    />

                    <Button
                        type="submit"
                        variant="outline"
                        size="icon"
                        className="rounded-full p-2"
                    >
                        <Send />
                    </Button>
                </div>
            </form>
            <FileMenu />
        </>
    );
};

export default AppLayout()(Chat);
