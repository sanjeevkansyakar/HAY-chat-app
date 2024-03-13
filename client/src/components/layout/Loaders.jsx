import React from "react";
import { Skeleton } from "../ui/skeleton";

export const LayoutLoader = () => {
    return (
        <div className="grid grid-cols-12 h-screen space-x-2">
            <div className="h-full max-sm:hidden sm:col-span-4 md:col-span-3">
                <Skeleton className="h-screen" />
            </div>
            <div className="h-full col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-6">
                <div className="space-y-2">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton key={index} className="h-20" />
                    ))}
                </div>
            </div>
            <div className="h-full max-md:hidden md:col-span-4 lg:col-span-3">
                <Skeleton className="h-screen" />
            </div>
        </div>
    );
};
