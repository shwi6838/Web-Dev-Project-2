import { compare, genSaltSync, hashSync } from 'bcryptjs-react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import database from '../firebaseConfig.js';

export const salt = genSaltSync(10);
export const Authenticate = (login, servers) => {
    console.log(`[DEBUG] authenticated user ${login.username}`);
    setLogin({
      ...login,
      task: null,
      auth: true,
      servers: servers || []
    });
  };

export const Deauthenticate = (login) => {
    console.log(`[DEBUG] deauthenticated user ${login.username}`);
    setLogin({
        username: '',
        password: '',
        task: null,
        auth: false,
        servers: []
      });
    };

//Create a new user in the database collection
export const Signup = async (login) => {
    console.log(`[DEBUG] user ${login.username} is signing up`);
    const userCollection = collection(database, "Users");
    const q_check = query(
        userCollection, 
        where("username", "==", login.username)
    );
    const snapshot = await getDocs(q_check);
    if (!snapshot.empty) {
        console.log(`[ERROR] user ${login.username} already exists`);
        Deauthenticate();
        return;
    }

    await addDoc(userCollection, {
        "username": login.username,
        "password": hashSync(login.password, salt),
        "servers": []
    });
    console.log(`[DEBUG] user ${login.username} signed up successfully`);
    Login();
};

//Check if user exists and if password matches to set the auth state (Authenticate)
export const Login = async (login) => {
    console.log(`[DEBUG] user ${login.username} is logging in`);
    //find the user in the database
    const userCollection = collection(database, "Users");
    const q_login = query(
        userCollection2,
        where("username", "==", login.username)
    );
    const snapshot = await getDocs(q_login);
    if (snapshot.empty) {
        console.log(`[ERROR] user ${login.username} does not exist`);
        Deauthenticate();
        return;
    }
    //split the user data
    const userItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        userData: doc.data()
    }));

    if (userItems.length > 1) {
        console.log(`[ERROR] user ${login.username} has multiple entries`);
        Deauthenticate();
        return;
    }
    //compare the password
    if(compare(login.password, userItems[0].userData.password)) {
        console.log(`[DEBUG] user ${login.username}  entered a matching password`);
        Authenticate(login, userItems[0].userData.servers);
    } else {
            console.log(`[ERROR] user ${login.username} entered an incorrect password`);
            Deauthenticate(login);
        }
};

