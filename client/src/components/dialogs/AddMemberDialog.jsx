import React, { useState } from "react";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sampleUsers } from "@/constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((currElement) => currElement !== id)
                : [...prev, id]
        );
    };

    const closeHandler = () => {
        setSelectedMembers([]);
        setMembers([]);
    };

    const addMemberSubmitHandler = () => {
        closeHandler();
    };
    return (
        <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
                <DialogTitle>Add Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
                {members.length > 0 ? (
                    members.map((i) => (
                        <UserItem
                            key={i._id}
                            user={i}
                            handler={selectMemberHandler}
                            isAdded={selectedMembers.includes(i._id)}
                        />
                    ))
                ) : (
                    <h5 className="text-center text-xl font-semibold">
                        No Friends
                    </h5>
                )}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <div>
                        <Button
                            type="button"
                            variant="outline"
                            className="mr-3 text-red-600 hover:text-red-500"
                            onClick={closeHandler}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={addMemberSubmitHandler}
                            disabled={isLoadingAddMember}
                        >
                            Submit changes
                        </Button>
                    </div>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default AddMemberDialog;
