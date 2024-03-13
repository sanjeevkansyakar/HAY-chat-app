import AvatarCard from "@/components/shared/AvatarCard";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { sampleChats, sampleUsers } from "@/constants/sampleData";
import { Check, Edit2, MenuIcon, MoveLeft, Plus, Trash2 } from "lucide-react";
import { memo, useState, useEffect, lazy } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import UserItem from "@/components/shared/UserItem";

const ConfirmDeleteDialog = lazy(() =>
    import("@/components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
    import("@/components/dialogs/AddMemberDialog")
);

const isAddMember = false;

const Groups = () => {
    const navigate = useNavigate();

    const chatId = useSearchParams()[0].get("group");

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

    const navigateBack = () => {
        navigate("/");
    };

    const handleMobile = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const handleMobileClose = () => setIsMobileMenuOpen(false);

    const updateGroupName = () => {
        setIsEdit(false);
        console.log(groupNameUpdatedValue);
    };

    const openAddMemberHandler = () => {
        console.log("Add member");
    };
    const openConfirmDeleteHandler = () => {
        setConfirmDeleteDialog(true);
        console.log("Delete Group");
    };

    const closeConfirmDeleteHandler = () => {
        setConfirmDeleteDialog(false);
        console.log("Add member");
    };

    const deleteHandler = () => {
        console.log("Delete Handler");
    };

    const removeMemberHandler = (id) => {
        console.log("Remove Member", id);
    };

    useEffect(() => {
        if (chatId) {
            setGroupName(`Group Name ${chatId}`);
            setGroupNameUpdatedValue(`Group Name ${chatId}`);
        }

        return () => {
            setGroupName("");
            setGroupNameUpdatedValue("");
            setIsEdit(false);
        };
    }, [chatId]);

    const IconBtns = (
        <>
            <div className="block sm:hidden fixed right-4 top-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            // onClick={handleMobile}
                        >
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="px-0 overflow-auto">
                        <div
                        // className="block sm:hidden"
                        // onClick={handleMobileClose}
                        >
                            <GroupsList
                                w={"50vw"}
                                myGroups={sampleChats}
                                chatId={chatId}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-8 left-8 bg-black/80 text-white rounded-full duration-300"
                            onClick={navigateBack}
                        >
                            <MoveLeft />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Back</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );

    const GroupName = (
        <div className="flex items-center justify-center gap-4 p-12">
            {isEdit ? (
                <>
                    <Input
                        // type="text"
                        value={groupNameUpdatedValue}
                        onChange={(e) =>
                            setGroupNameUpdatedValue(e.target.value)
                        }
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={updateGroupName}
                    >
                        <Check />
                    </Button>
                </>
            ) : (
                <>
                    <h4 className="text-xl sm:text-2xl font-semibold">
                        {groupName}
                    </h4>
                    <Button
                        className=" bg-transparent text-black hover:bg-transparent"
                        size="icon"
                        onClick={() => setIsEdit(true)}
                    >
                        <Edit2 className="h-5 w-5" />
                    </Button>
                </>
            )}
        </div>
    );

    const ButtonGroup = (
        <div className="flex flex-col-reverse sm:flex-row gap-4 p-0 sm:p-4 md:px-12">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-red-600 hover:text-red-500"
                        // onClick={openConfirmDeleteHandler}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Delete Group
                    </Button>
                </DialogTrigger>
                <ConfirmDeleteDialog deleteHandler={deleteHandler} />
            </Dialog>

            {isAddMember ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" onClick={openAddMemberHandler}>
                            <Trash2 className="mr-2 h-4 w-4" /> Add Member
                        </Button>
                    </DialogTrigger>
                    <AddMemberDialog />
                </Dialog>
            ) : (
                <Button size="lg" onClick={openAddMemberHandler}>
                    <Trash2 className="mr-2 h-4 w-4" /> Add Member
                </Button>
            )}
        </div>
    );

    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="hidden sm:block sm:col-span-4 overflow-auto">
                <GroupsList myGroups={sampleChats} chatId={chatId} />
            </div>

            <div className="flex flex-col items-center relative py-4 px-6 sm:px-12 col-span-12 sm:col-span-8">
                {IconBtns}

                {groupName && (
                    <>
                        {GroupName}
                        <h5 className="m-6 self-start">Members</h5>
                        <div className="w-full max-w-[45rem] box-border p-0 sm:p-4 md:px-16 h-[50vh] overflow-auto space-y-4">
                            {sampleUsers.map((i) => (
                                <UserItem
                                    key={i._id}
                                    user={i}
                                    isAdded
                                    className="py-4 px-8 rounded-xl shadow-lg"
                                    handler={removeMemberHandler}
                                />
                            ))}
                        </div>

                        {ButtonGroup}
                    </>
                )}
            </div>

            {isAddMember}

            {/* {isMobileMenuOpen && (
                <div className="block sm:hidden" onClick={handleMobileClose}>
                    <GroupsList
                        w={"50vw"}
                        myGroups={sampleChats}
                        chatId={chatId}
                    />
                </div>
            )} */}
        </div>
    );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
    <div className={`w-[${w}] bg-slate-100 min-h-screen`}>
        {myGroups.length > 0 ? (
            myGroups.map((group) => (
                <GroupListItem group={group} chatId={chatId} key={group._id} />
            ))
        ) : (
            <p className="p-4 text-center">No groups</p>
        )}
    </div>
);

const GroupListItem = memo(({ group, chatId }) => {
    const { name, avatar, _id } = group;

    return (
        <Link
            to={`?group=${_id}`}
            onClick={(e) => {
                if (chatId === _id) e.preventDefault();
            }}
        >
            <div className="flex items-center hover:bg-gray-200 p-3">
                <AvatarCard avatar={avatar} />
                <h5>{name}</h5>
            </div>
        </Link>
    );
});

export default Groups;
