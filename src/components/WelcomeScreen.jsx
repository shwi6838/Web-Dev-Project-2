import React from 'react';
import { useState, useEffect } from 'react';
import { Authenticate, Deauthenticate, Signup, Login } from '../auth';
import { mockData } from '../assets/mockData';

function WelcomeScreen({ login, setLogin }) {
    const [curr_username, setUsername] = useState('');
    const [curr_password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSignUp = async () => {
        try {
          setLogin({
            ...login,
            username: curr_username,
            password: curr_password,
            task: true,
            auth: true,
            servers: []
          });
          await Signup(login); // Call Signup
          await Login(login); // Auto-login after signup
          console.log(`[DEBUG] User ${username} signed up and logged in`);
        } catch (err) {
          console.error(err);
          setError('Signup failed. Please try again.');
        }
    };

    useEffect(() => {
        console.log('[DEBUG] Welcome Screen rendered');
    }, []);

    const handleLogin = async () => {
        try {
          setLogin({
            ...login,
            username: curr_username,
            password: curr_password,
            task: true, 
            auth: true,
            servers: mockData.servers || [] //need to set to actual data
          });
          await Login(login); // Call Login
          console.log(`[DEBUG] User ${username} logged in`);
        } catch (err) {
          console.error(err);
          setError('Login failed. Please try again.');
        }
    };

    return (
        <div>
          <h1>Welcome</h1>
          {/* <form> */}
            <input
                type="text"
                placeholder="Username"
                value={curr_username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={curr_password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* </form> */}
        </div>
    );
}

export default WelcomeScreen;