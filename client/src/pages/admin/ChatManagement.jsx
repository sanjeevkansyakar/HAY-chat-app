import AdminLayout from "@/components/layout/AdminLayout";
import DataTable from "@/components/shared/DataTable";
import React, { useState, useEffect } from "react";
import { dashboardData } from "@/constants/sampleData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { transformImage } from "@/lib/features";
import AvatarCard from "@/components/shared/AvatarCard";

const columns = [
    {
        accessorKey: "_id",
        header: "ID",
    },
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => {
            const image = row.getValue("avatar");

            return <AvatarCard avatar={image} />;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "totalMembers",
        header: "Total Members",
    },
    {
        accessorKey: "members",
        header: "Members",
        cell: ({ row }) => {
            const image = row.getValue("members");
            return <AvatarCard avatar={image} />;
        },
    },
    {
        accessorKey: "totalMessages",
        header: "Total Messages",
    },
    {
        accessorKey: "creator",
        header: "Created By",
        cell: ({ row }) => {
            const creator = row.getValue("creator");

            return (
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={creator.avatar} alt={creator.name} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{creator.name}</span>
                </div>
            );
        },
    },
];

const ChatManagement = () => {
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        // setRowsData(dashboardData.users);
        setRowsData(
            dashboardData.chats.map((i) => ({
                ...i,
                id: i._id,
                avatar: i.avatar.map((i) => transformImage(i, 50)),
                members: i.members.map((i) => transformImage(i.avatar, 50)),
                creator: {
                    name: i.creator.name,
                    avatar: transformImage(i.creator.avatar, 50),
                },
            }))
        );
    }, []);
    return (
        <AdminLayout>
            <div className="mx-auto py-14 h-screen">
                <h1 className="py-8 text-center text-3xl uppercase font-bold">
                    All Chats
                </h1>
                <DataTable columns={columns} data={rowsData} />
            </div>
        </AdminLayout>
    );
};

export default ChatManagement;
