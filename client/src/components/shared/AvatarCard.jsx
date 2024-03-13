import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { transformImage } from "@/lib/features";

const AvatarCard = ({ avatar = [] }) => {
    return (
        <div className="flex space-x-2">
            <div className="flex relative w-20 h-12 overflow-hidden">
                {avatar.map((i, index) => (
                    <Avatar
                        key={Math.random() * 100}
                        // className={`left-[${
                        //     0.5 + index
                        // }rem] -left-[${index}rem]`}
                        style={{ left: `-${index}rem` }}
                        className="w-12 h-12"
                    >
                        <AvatarImage
                            src={transformImage(i)}
                            alt={`Avatar ${index}`}
                            // className={`absolute left-[${
                            //     0.5 + index
                            // }rem] sm:left-[${index}rem] `}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                ))}
            </div>
        </div>
    );
};

export default AvatarCard;
