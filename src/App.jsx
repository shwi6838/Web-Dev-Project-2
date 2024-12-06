import React, { useState } from 'react';
import ServersList from './components/ServersList';
import CategoriesList from './components/CategoriesList';
import ChannelsList from './components/ChannelsList';
import ChatRoom from './components/Messages';
import WelcomeScreen from './components//WelcomeScreen';
import { mockData } from './assets/mockData';


function App() {
    const [selectedServer, setSelectedServer] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignIn = () => {
        setIsLoggedIn(true);
    };

    const serverData = mockData.servers[selectedServer];
    const categoryData = serverData?.categories[selectedCategory];
    const channelData = categoryData?.channels[selectedChannel];

    return (
        <div className="app">
            {!isLoggedIn ? (
                <WelcomeScreen onSignIn={handleSignIn} />
            ) : (
                <>
                    <ServersList
                        servers={mockData.servers}
                        onSelectServer={(serverId) => {
                            setSelectedServer(serverId);
                            setSelectedCategory(null);
                            setSelectedChannel(null);
                        }}
                    />
                    {serverData && (
                        <CategoriesList
                            categories={serverData.categories}
                            onSelectCategory={(categoryId) => {
                                setSelectedCategory(categoryId);
                                setSelectedChannel(null);
                            }}
                        />
                    )}
                    {categoryData && (
                        <ChannelsList
                            channels={categoryData.channels}
                            onSelectChannel={setSelectedChannel}
                        />
                    )}
                    {channelData && <ChatRoom messages={channelData.messages} />}
                </>
            )}
        </div>
    );
}

export default App;
