import { Minus, Plus } from "lucide-react";
import React, { memo } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const UserItem = ({
    user,
    handler,
    handleIsLoading,
    isAdded = false,
    className = "",
}) => {
    const { name, _id, avatar } = user;
    return (
        <div>
            <div className={`flex items-center gap-4 w-full ${className}`}>
                <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <h4 className="line-clamp-1 flex-grow w-full">{name}</h4>

                <Button
                    variant={isAdded ? "destructive" : "outline"}
                    onClick={() => handler(_id)}
                    disabled={handleIsLoading}
                    size={"icon"}
                    className="rounded-full p-2 border-2"
                >
                    {isAdded ? <Minus /> : <Plus />}
                </Button>
            </div>
        </div>
    );
};

export default memo(UserItem);
