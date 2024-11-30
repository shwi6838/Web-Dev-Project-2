import { auth } from "/firebase.js";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import React, { useEffect } from "react";
import "./Welcome.css";

const Welcome = () => {
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const signOut = () => {
        auth.signOut();
    };

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    console.log('User signed in:', result.user);
                }
            })
            .catch((error) => {
                console.error('Error during redirect:', error.message);
            });
    }, []);


    return (
        <div className="welcome">
            <h1>Welcome to Discord Clone</h1>
            <p>This is a simple Discord clone built with React, Firebase, and Vite.</p>
            <button id = "sign-in" onClick = {googleSignIn}>
                <img id = "google-logo"
                src = "sign-in-google.png"
                alt = "Google logo"
                />
            </button>
        </div>
    );
};

export default Welcome;