import React, { useState } from "react";
import { sampleUsers } from "@/constants/sampleData";
import UserItem from "../shared/UserItem";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useInputValidation } from "6pp";

const NewGroup = () => {
    const groupName = useInputValidation("");

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((currElement) => currElement !== id)
                : [...prev, id]
        );
    };
    console.log(selectedMembers);

    const submitHandler = () => {};
    return (
        <div className="space-y-4">
            <Input
                value={groupName.value}
                onChange={groupName.changeHandler}
                autoFocus
                placeholder="Group Name"
            />

            <h4>Members</h4>

            <div className=" space-y-2">
                {members.map((i) => (
                    <UserItem
                        user={i}
                        key={i._id}
                        handler={selectMemberHandler}
                        isAdded={selectedMembers.includes(i._id)}
                    />
                ))}
            </div>

            <div className="flex gap-2 justify-end">
                <Button variant="destructive">Cancel</Button>
                <Button onClick={submitHandler}>Accept</Button>
            </div>
        </div>
    );
};

export default NewGroup;
