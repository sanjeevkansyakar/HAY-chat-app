import { transformImage } from "@/lib/features";
import { FileHeart } from "lucide-react";
import React from "react";

const RenderAttachment = (file, url) => {
    switch (file) {
        case "video":
            return <video src={url} preload="none" width={"200px"} controls />;

        case "image":
            return (
                <img
                    src={transformImage(url, 200)}
                    alt="Attachment"
                    width={"150px"}
                    height={"100px"}
                    className="object-contain"
                />
            );

        case "audio":
            return <audio src={url} preload="none" controls />;

        default:
            return <FileHeart />;
    }
};

export default RenderAttachment;
