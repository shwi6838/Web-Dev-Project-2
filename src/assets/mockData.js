export const mockData = {
    servers: {
        server1: {
            name: "Gaming Hub",
            categories: {
                category1: {
                    name: "General",
                    channels: {
                        channel1: {
                            name: "Chat",
                            messages: [
                                { username: "User1", text: "Hello everyone!" },
                                { username: "User2", text: "Hey there!" },
                            ],
                        },
                    },
                },
            },
        },
        server2: {
            name: "Tech Talk",
            categories: {
                category2: {
                    name: "Programming",
                    channels: {
                        channel2: {
                            name: "JavaScript",
                            messages: [
                                { username: "User3", text: "Any ES6 features?" },
                                { username: "User4", text: "Arrow functions!" },
                            ],
                        },
                    },
                },
            },
        },
    },
};