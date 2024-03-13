import {
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    MessageSquareHeart,
    UserCog,
    UsersRoundIcon,
    X,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link, Navigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboardIcon />,
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <UserCog />,
    },
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <UsersRoundIcon />,
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageSquareHeart />,
    },
];

const Sidebar = () => {
    const location = useLocation();

    const logoutHandler = () => {
        console.log("logout");
    };

    return (
        <div className="flex flex-col p-1 sm:py-10 sm:px-6 gap-10">
            <h5 className="uppercase text-xl font-bold">Chat</h5>

            <div className="flex flex-col space-y-2">
                {adminTabs.map((tab) => (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        className={cn(
                            "no-underline p-2 sm:py-3 sm:px-6 flex flex-col rounded-full",
                            location.pathname === tab.path
                                ? " bg-black text-white"
                                : " hover:bg-slate-200"
                        )}
                    >
                        <div className="flex items-center gap-4 p-1 rounded-3xl">
                            {tab.icon}

                            <h5>{tab.name}</h5>
                        </div>
                    </Link>
                ))}

                <Link
                    onClick={logoutHandler}
                    className={cn(
                        "no-underline p-2 sm:py-3 sm:px-6 flex flex-col rounded-full hover:bg-slate-200"
                    )}
                >
                    <div className="flex items-center gap-4 p-1 rounded-3xl">
                        <LogOutIcon />

                        <h5>Logout</h5>
                    </div>
                </Link>
            </div>
        </div>
    );
};

const isAdmin = true;

const AdminLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    const handleMobile = () => setIsMobile(!isMobile);

    if (!isAdmin) return <Navigate to={"/admin"} />;
    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="block md:hidden fixed right-4 top-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            // onClick={handleMobile}
                        >
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[60vw]">
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden md:block md:col-span-4 lg:col-span-3">
                <Sidebar />
            </div>

            <div className=" col-span-12 md:col-span-8 lg:col-span-9 bg-stone-100">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
