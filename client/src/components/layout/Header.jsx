import React, { lazy, Suspense, useState } from "react";
import {
    AlignJustify,
    Search,
    LogOut,
    UsersRound,
    Plus,
    Bell,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

const Header = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const handleMobile = () => {
        setIsMobile((prev) => !prev);
    };
    const openSearch = () => {
        setIsSearch((prev) => !prev);
    };
    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev);
    };
    const openNotification = () => {
        setIsNotification((prev) => !prev);
    };
    const logoutHandler = () => {
        console.log("Logout");
    };

    const navigateToGroup = () => navigate("/groups");
    return (
        <>
            <div className="flex static  bg-orange-300">
                <div className="flex-1 h-16 ">
                    <h2 className="h-16 text-2xl font-bold p-3 max-sm:hidden sm:block">
                        Chat
                    </h2>

                    <button
                        className="h-16 bg-transparent block sm:hidden p-3"
                        onClick={handleMobile}
                    >
                        <AlignJustify />
                    </button>
                </div>
                <div className="flex gap-1">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center">
                                <IconBtn
                                    title="Search"
                                    icon={<Search />}
                                    // onClick={openSearch}
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[400px]">
                            <DialogHeader>
                                <DialogTitle>Find People</DialogTitle>
                                {/* <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </DialogDescription> */}
                            </DialogHeader>
                            {/* {isSearch && ( */}
                            <Suspense fallback={<div>Loading...</div>}>
                                <SearchDialog />
                            </Suspense>
                            {/* )} */}
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center">
                                <IconBtn
                                    title="New Group"
                                    icon={<Plus />}
                                    // onClick={openSearch}
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[400px]">
                            <DialogHeader>
                                <DialogTitle>New Group</DialogTitle>
                                {/* <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </DialogDescription> */}
                            </DialogHeader>
                            {/* {isSearch && ( */}
                            <Suspense fallback={<div>Loading...</div>}>
                                <NewGroupDialog />
                            </Suspense>
                            {/* )} */}
                        </DialogContent>
                    </Dialog>
                    {/* <IconBtn
                        title="New Group"
                        icon={<Plus />}
                        onClick={openNewGroup}
                    /> */}
                    <IconBtn
                        title="Manage Groups"
                        icon={<UsersRound />}
                        onClick={navigateToGroup}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center">
                                <IconBtn
                                    title="Notification"
                                    icon={<Bell />}
                                    // onClick={openSearch}
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[400px]">
                            <DialogHeader>
                                <DialogTitle>Notification</DialogTitle>
                                {/* <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </DialogDescription> */}
                            </DialogHeader>
                            {/* {isSearch && ( */}
                            <Suspense fallback={<div>Loading...</div>}>
                                <NotificationDialog />
                            </Suspense>
                            {/* )} */}
                        </DialogContent>
                    </Dialog>
                    {/* <IconBtn
                        title="Notification"
                        icon={<BellDot />}
                        onClick={openNotification}
                    /> */}
                    <IconBtn
                        title="Logout"
                        icon={<LogOut />}
                        onClick={logoutHandler}
                    />
                </div>
            </div>

            {/* {isSearch && (
                <Suspense
                    fallback={
                        <Skeleton className="h-full w-full bg-black/80" />
                    }
                >
                    <SearchDialog />
                </Suspense>
            )} */}

            {/* {isNotification && (
                <Suspense fallback={<div>Loading...</div>}>
                    <NotificationDialog />
                </Suspense>
            )} */}

            {/* {isNewGroup && (
                <Suspense fallback={<div>Loading...</div>}>
                    <NewGroupDialog />
                </Suspense>
            )} */}
        </>
    );
};

const IconBtn = ({ title, icon, onClick }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className="p-3" onClick={onClick}>
                        {icon}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Header;
