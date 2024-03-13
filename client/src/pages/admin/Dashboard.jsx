import AdminLayout from "@/components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "@/components/specific/Charts";
import { Button } from "@/components/ui/button";
import {
    Bell,
    MessageSquareHeartIcon,
    ShieldCheckIcon,
    User2Icon,
    UsersRoundIcon,
} from "lucide-react";
import moment from "moment";
import React from "react";

const Dashboard = () => {
    const Appbar = (
        <div className="p-4 sm:p-8 my-6 rounded-xl shadow-3xl bg-white">
            <div className="flex items-center gap-3 sm:gap-4">
                <ShieldCheckIcon className="w-12 h-12" />

                <input
                    type="text"
                    className="py-2 px-4 sm:py-4 sm:px-8 w-[20vmax] border-none outline-none rounded-full bg-gray-100 text-lg"
                    placeholder="Search.."
                />

                <Button variant="curve" size="big">
                    Search
                </Button>

                <div className=" flex-grow" />

                <p className="hidden lg:block text-center text-gray-600">
                    {moment().format("dddd, D MMMM YYYY")}
                </p>

                <Bell className="text-black" />
            </div>
        </div>
    );

    const Widgets = (
        <div className="flex flex-col sm:flex-row gap-8 justify-between items-center my-8">
            <Widget title={"Users"} value={25} Icon={<User2Icon />} />
            <Widget title={"Chats"} value={5} Icon={<UsersRoundIcon />} />
            <Widget
                title={"Messages"}
                value={255}
                Icon={<MessageSquareHeartIcon />}
            />
        </div>
    );

    return (
        <AdminLayout>
            <main className="mx-4">
                {Appbar}

                <div className="flex flex-col lg:flex-row flex-wrap gap-6 justify-center items-center lg:items-stretch">
                    <div className="py-8 px-14 rounded-lg w-full max-w-[44rem] shadow-3xl bg-white">
                        <h4 className="text-2xl font-medium my-6">
                            Last Messages
                        </h4>
                        <LineChart value={[1, 32, 8, 33, 5]} />
                    </div>

                    <div className="p-4 rounded-lg flex items-center justify-center w-full sm:w-1/2 relative max-w-[23rem] shadow-3xl bg-white">
                        <DoughnutChart
                            labels={["Single Chats", "Group Chats"]}
                            value={[25, 65]}
                        />

                        <div className=" absolute flex items-center justify-center gap-2 w-full h-full">
                            <UsersRoundIcon />
                            <p>vs</p>
                            <User2Icon />
                        </div>
                    </div>
                </div>

                {Widgets}
            </main>
        </AdminLayout>
    );
};

const Widget = ({ title, value, Icon }) => {
    return (
        <div className="bg-white p-8 my-4 rounded-xl w-80 shadow-3xl">
            <div className="flex flex-col items-center  gap-4">
                <p className="flex items-center justify-center size-20 text-black/70 rounded-full border-[5px] border-solid border-black">
                    {value}
                </p>
                <div className="flex items-center gap-4">
                    {Icon}
                    <p>{title}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
