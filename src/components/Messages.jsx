import React, { useState } from 'react';

function ChatRoom({ messages }) {
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            messages.push({ username: "You", text: newMessage });
            setNewMessage("");
        }
    };

    return (
        <div className="chat-room">
            <h3>Chat Room</h3>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <strong>{message.username}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatRoom;
