import AdminLayout from "@/components/layout/AdminLayout";
import DataTable from "@/components/shared/DataTable";
import React, { useState, useEffect } from "react";
import { dashboardData } from "@/constants/sampleData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fileFormat, transformImage } from "@/lib/features";
import AvatarCard from "@/components/shared/AvatarCard";
import moment from "moment";
import RenderAttachment from "@/components/shared/RenderAttachment";

const columns = [
    {
        accessorKey: "_id",
        header: "ID",
    },
    {
        accessorKey: "attachments",
        header: "Attachments",
        cell: ({ row }) => {
            const attachment = row.getValue("attachments");

            return attachment?.length > 0
                ? attachment.map((i) => {
                      const url = i.url;
                      const file = fileFormat(url);

                      return (
                          <div key={i.public_id}>
                              <a
                                  href={url}
                                  className="text-black"
                                  target="_blank"
                                  download
                              >
                                  {RenderAttachment(file, url)}
                              </a>
                          </div>
                      );
                  })
                : "No Attachments";
        },
    },
    {
        accessorKey: "content",
        header: "Content",
    },
    {
        accessorKey: "sender",
        header: "Sent By",
        cell: ({ row }) => {
            const image = row.getValue("sender");

            return (
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={image.avatar} alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{image.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "chat",
        header: "Chat",
    },
    {
        accessorKey: "groupChat",
        header: "Group Chat",
    },
    {
        accessorKey: "createdAt",
        header: "Time",
    },
];

const MessageManagement = () => {
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        setRowsData(
            dashboardData.messages.map((i) => ({
                ...i,
                id: i._id,
                sender: {
                    name: i.sender.name,
                    avatar: transformImage(i.sender.avatar, 50),
                },
                createdAt: moment(i.createdAt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                ),
            }))
        );
    }, []);
    return (
        <AdminLayout>
            <div className="mx-auto py-14 h-screen">
                <h1 className="py-8 text-center text-3xl uppercase font-bold">
                    All Messages
                </h1>
                <DataTable columns={columns} data={rowsData} />
            </div>
        </AdminLayout>
    );
};

export default MessageManagement;
