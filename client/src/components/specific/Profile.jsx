import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, AtSign, Smile, CalendarDays } from "lucide-react";
import moment from "moment";

const Profile = () => {
    return (
        <div className="flex flex-col items-center gap-8">
            <Avatar className="w-48 h-48 object-contain border-[5px] border-white">
                <AvatarFallback>
                    <UserRound className="size-48 text-gray-300" />
                </AvatarFallback>
            </Avatar>
            <ProfileCard heading={"Bio"} text={"knjbfbj sd asbdj akjasbdj "} />
            <ProfileCard
                heading={"Username"}
                text={"@sanjeevkansyakar"}
                Icon={<AtSign />}
            />
            <ProfileCard
                heading={"Name"}
                text={"Sanjeev Kansyakar"}
                Icon={<Smile />}
            />
            <ProfileCard
                heading={"Joined"}
                text={moment("2023-11-05T00:00:00.000Z").fromNow()}
                Icon={<CalendarDays />}
            />
        </div>
    );
};

const ProfileCard = ({ text, Icon, heading }) => (
    <div className="flex items-center gap-4 text-center">
        {Icon && Icon}

        <div>
            <h3>{text}</h3>
            <p className=" text-gray-300 text-sm">{heading}</p>
        </div>
    </div>
);
export default Profile;
