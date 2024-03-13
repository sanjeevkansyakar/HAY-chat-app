import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "@/constants/sampleData";

const Search = () => {
    const search = useInputValidation("");

    const [users, setUsers] = useState(sampleUsers);

    const addFriendHandler = (id) => {
        console.log(id);
    };
    const isLoadingSendFriendRequest = false;
    return (
        <div className="flex flex-col w-full gap-4">
            <div className="relative">
                <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    value={search.value}
                    onChange={search.changeHandler}
                    placeholder="Search your friends"
                    autoFocus
                    className="pl-9"
                />
            </div>

            <div className="space-y-2">
                {users.map((i) => (
                    <UserItem
                        user={i}
                        key={i._id}
                        handler={addFriendHandler}
                        handleIsLoading={isLoadingSendFriendRequest}
                    />
                ))}
            </div>
        </div>
    );
};

export default Search;
