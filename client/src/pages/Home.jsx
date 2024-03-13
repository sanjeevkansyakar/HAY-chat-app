import AppLayout from "@/components/layout/AppLayout";
import React from "react";

const Home = () => {
    return (
        <div className="h-full bg-gray-50">
            <h4 className="p-8 text-center font-medium">
                Select a friend to chat
            </h4>
        </div>
    );
};

export default AppLayout()(Home);
