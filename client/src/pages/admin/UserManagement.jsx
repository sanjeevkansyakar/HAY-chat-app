import AdminLayout from "@/components/layout/AdminLayout";
import DataTable from "@/components/shared/DataTable";
import React, { useState } from "react";
import { dashboardData } from "@/constants/sampleData";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { transformImage } from "@/lib/features";

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

            return (
                <Avatar>
                    <AvatarImage src={image} alt="img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "friends",
        header: "Friends",
    },
    {
        accessorKey: "groups",
        header: "Groups",
    },
];

const UserManagement = () => {
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        setRowsData(
            dashboardData.users.map((i) => ({
                ...i,
                id: i._id,
                avatar: transformImage(i.avatar, 50),
            }))
        );
    }, []);
    return (
        <AdminLayout>
            <div className="mx-auto py-14 h-screen">
                <h1 className="py-8 text-center text-3xl font-bold">
                    ALL USERS
                </h1>
                <DataTable columns={columns} data={rowsData} />
            </div>
        </AdminLayout>
    );
};

export default UserManagement;
