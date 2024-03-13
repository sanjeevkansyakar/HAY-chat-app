export const sampleChats = [
    {
        avatar: ["https://w3schools.com/howto/img_avatar.png"],
        name: "John doe",
        _id: "1",
        groupChat: false,
        members: ["1", "2"],
    },
    {
        avatar: ["https://w3schools.com/howto/img_avatar.png"],
        name: "John boi",
        _id: "2",
        groupChat: true,
        members: ["1", "2"],
    },
];

export const sampleUsers = [
    {
        avatar: ["https://w3schools.com/howto/img_avatar.png"],
        name: "John doe",
        _id: "1",
    },
    {
        avatar: ["https://w3schools.com/howto/img_avatar.png"],
        name: "John boi",
        _id: "2",
    },
];
export const sampleNotifications = [
    {
        sender: {
            avatar: ["https://w3schools.com/howto/img_avatar.png"],
            name: "John doe",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: ["https://w3schools.com/howto/img_avatar.png"],
            name: "John boi",
        },
        _id: "2",
    },
];

export const sampleMessage = [
    {
        // attachments: [
        //     {
        //         public_id: "hahsjd",
        //         url: "https://w3schools.com/howto/img_avatar.png",
        //     },
        // ],
        content: "Message from a Friend",
        _id: "ghsdkjfadshfadsfhlsdfjh",
        sender: {
            _id: "user._id",
            name: "Amit",
        },
        chat: "chatId",
        createdAt: "2024-03-05T13:59:08.274Z",
    },
    {
        attachments: [
            {
                public_id: "hahsjd 2",
                url: "https://w3schools.com/howto/img_avatar.png",
            },
        ],
        // content: "Message from a Friend 2",
        _id: "ghsdkjfadshfadsfsfdhlsdfjh",
        sender: {
            _id: "jhasdgaj",
            name: "Sanju",
        },
        chat: "chatId",
        createdAt: "2024-03-05T14:08:28.357Z",
    },
];

export const dashboardData = {
    users: [
        {
            name: "John doi",
            avatar: "https://w3schools.com/howto/img_avatar.png",
            _id: "1",
            username: "john_doe",
            friends: 20,
            groups: 5,
        },
        {
            name: "John boi",
            avatar: "https://w3schools.com/howto/img_avatar.png",
            _id: "2",
            username: "john_boe",
            friends: 20,
            groups: 15,
        },
    ],

    chats: [
        {
            name: "Cricket group",
            avatar: ["https://w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: false,
            members: [
                {
                    _id: "1",
                    avatar: "https://w3schools.com/howto/img_avatar.png",
                },
                { _id: "2", avatar: "https://github.com/shadcn.png" },
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "John doi",
                avatar: "https://w3schools.com/howto/img_avatar.png",
            },
        },
        {
            name: "Batminton group",
            avatar: ["https://w3schools.com/howto/img_avatar.png"],
            _id: "2",
            groupChat: true,
            members: [
                { _id: "1", avatar: "https://github.com/shadcn.png" },
                {
                    _id: "2",
                    avatar: "https://w3schools.com/howto/img_avatar.png",
                },
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "John boi",
                avatar: "https://w3schools.com/howto/img_avatar.png",
            },
        },
    ],

    messages: [
        {
            attachments: [],
            content: "Good Morning",
            _id: "lsdbiufbasjdkfusbkjs",
            sender: {
                avatar: "https://w3schools.com/howto/img_avatar.png",
                name: "Ayush",
            },
            chat: "chatId",
            groupChat: false,
            createdAt: "2024-03-05T13:59:08.274Z",
        },
        {
            attachments: [
                {
                    public_id: "hahsjd 2",
                    url: "https://w3schools.com/howto/img_avatar.png",
                },
            ],
            content: "Good Night",
            _id: "lsdbiufbasjdkfusbk",
            sender: {
                avatar: "https://github.com/shadcn.png",
                name: "Sanju",
            },
            chat: "chatId",
            groupChat: true,
            createdAt: "2024-03-05T13:59:08.274Z",
        },
    ],
};
