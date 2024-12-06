import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import database from '/firebaseConfig';
import { mockData } from '../assets/mockData';

function ServersList({ servers, onSelectServer }) {
    // const [servers, setServers] = useState([]);
    // const [loading, setLoading] = useState(true);

    //console.log(servers);

    // useEffect(() => {
    //     const fetchServers = async () => {
    //         try {
    //             const serversRef = ref(database, 'servers');
    //             const snapshot = await get(serversRef);
    //             if (snapshot.exists()) {
    //                 setServers(Object.entries(snapshot.val()));
    //             } else {
    //                 console.log("No servers found");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching servers:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchServers();
    // }, []);

    // if (loading) {
    //     return <div>Loading servers...</div>;
    // }

    return (
        <div className="servers-list">
            <h3>Servers</h3>
            {Object.entries(servers).length === 0 ? (
                <p>No servers available</p>
            ) : (
                Object.entries(servers).map(([id, server]) => (
                    <div key={id} onClick={() => onSelectServer(id)}>
                        {server.name}
                    </div>
                ))
            )}
        </div>
    );
}

export default ServersList;
