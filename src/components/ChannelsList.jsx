import React from 'react';

function ChannelsList({ login, channels, onSelectChannel }) {
    return (
        <div className="channels-list">
            <h3>Channels</h3>
            {Object.entries(channels).map(([id, channel]) => (
                <div key={id} onClick={() => onSelectChannel(id)}>
                    {channel.name}
                </div>
            ))}
        </div>
    );
}

export default ChannelsList;
