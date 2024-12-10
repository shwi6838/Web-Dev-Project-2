import React, { useEffect, useState } from 'react';
import ServersList from './components/ServersList';
import CategoriesList from './components/CategoriesList';
import ChannelsList from './components/ChannelsList';
import ChatRoom from './components/Messages';
import WelcomeScreen from './components//WelcomeScreen';
import { mockData } from './assets/mockData';
import './index.css';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { compare, genSaltSync, hashSync } from 'bcryptjs-react';
import { Signup, Login, salt } from './auth.js';


function App() {
    const [selectedServer, setSelectedServer] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [login, setLogin] = useState({
        username: '',
        password: '',
        task: false,
        auth: false,
        servers: []
      });
    //const [login, setLogin] = useState(null);

    //const mockData = mockData.servers[selectedServer];
    const serverData = mockData.servers[selectedServer];
    const categoryData = serverData?.categories[selectedCategory];
    const channelData = categoryData?.channels[selectedChannel];

    useEffect(() => {
        console.log('[DEBUG] Changed server:', selectedServer);
    }, [selectedServer]);

    useEffect(() => {
        console.log('[DEBUG] Changed Channel:', selectedChannel);
    }, [selectedChannel]);

    useEffect(() => {
        if (login == null || !login.auth) {
            console.log('[DEBUGG] User is not logged in');
        } else if (login.auth) {
            console.log(`[DEBUG] User ${login.username} is logged in`);
            return;
        }
        if (login.task == "login") { Login(); }
        else if (login.task == "signup") { Signup(); }
        else { console.log(`[ERROR] Unknown task ${login.task}`); }
    } , [login]);

    return (
        <div className="app">
            {/* <h1>Can you see me</h1> */}
            {(login == null || !login.auth) ? (
                //<h1>Log In Please</h1>
                <WelcomeScreen login={login} setLogin={setLogin}/>
            ) : (
                <>
                    <ServersList
                        login={login}
                        servers={mockData.servers}
                        onSelectServer={(serverId) => {
                            setSelectedServer(serverId);
                            setSelectedCategory(null);
                            setSelectedChannel(null);
                        }}
                    />
                    {serverData && (
                        <CategoriesList
                            login={login}
                            categories={serverData.categories}
                            onSelectCategory={(categoryId) => {
                                setSelectedCategory(categoryId);
                                setSelectedChannel(null);
                            }}
                        />
                    )}
                    {categoryData && (
                        <ChannelsList
                            login={login}
                            channels={categoryData.channels}
                            onSelectChannel={setSelectedChannel}
                        />
                    )}
                    {channelData && <ChatRoom 
                        login={login}
                        messages={channelData.messages} 
                    />}
                </>
            )}
        </div>
    );
}

export default App;
