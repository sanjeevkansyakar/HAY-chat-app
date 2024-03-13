import { sampleNotifications } from "@/constants/sampleData";
import React from "react";
import { memo } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const Notifications = () => {
    const friendRequestHandler = ({ _id, accept }) => {};
    return (
        <div className=" space-y-2">
            {sampleNotifications.length > 0 ? (
                sampleNotifications.map(({ sender, _id }) => (
                    <NotificationItem
                        sender={sender}
                        _id={_id}
                        key={_id}
                        handler={friendRequestHandler}
                    ></NotificationItem>
                ))
            ) : (
                <h4 className="text-center">No Notifications</h4>
            )}
        </div>
    );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
    const { name, avatar } = sender;
    return (
        <div className="flex items-center gap-4 w-full">
            <Avatar>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h4 className="line-clamp-1 flex-grow w-full">{`${name} sent you a friend request.`}</h4>

            <div className="flex flex-col sm:flex-row gap-1">
                <Button onClick={() => handler({ _id, accept: true })}>
                    Accept
                </Button>
                <Button
                    variant="destructive"
                    onClick={() => handler({ _id, accept: false })}
                >
                    Reject
                </Button>
            </div>
        </div>
    );
});

export default Notifications;
