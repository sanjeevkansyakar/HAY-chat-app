import React from "react";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ConfirmDeleteDialog = ({ deleteHandler }) => {
    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this group?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <div>
                            <Button
                                type="button"
                                variant="outline"
                                className="mr-3"
                            >
                                No
                            </Button>
                            <Button onClick={deleteHandler}>Yes</Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </>
    );
};

export default ConfirmDeleteDialog;
