import { compare, genSaltSync, hashSync } from 'bcryptjs-react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import database from '../firebaseConfig.js';
export const salt = genSaltSync(10);

export const Authenticate = (login, servers) => {
    console.log(`[DEBUG] authenticated user ${login.username}`);
    setLogin({
      ...login,
      task: true,
      auth: true,
      servers: servers || []
    });
  };

export const Deauthenticate = (login) => {
    console.log(`[DEBUG] deauthenticated user ${login.username}`);
    setLogin({
        username: '',
        password: '',
        task: false,
        auth: false,
        servers: []
      });
    };

export const Signup = async (login) => {
    const q_check = query(
        collection(database, "/Users"), 
        where("username", "==", login.username)
    );
    getDocs(q_check)
    .then((snapshot) => {
        if (!snapshot.empty) {
            console.log(`[ERROR] user ${login.username} already exists`);
            Deauthenticate();
            return;
        }
        const q_add = query(
            collection(db, "/Users")
        );
        addDoc(q_add, {
            "username": login.username,
            "password": hashSync(login.password, salt),
            "servers": []
        })
        .then(() => {
         Login();
        });
    });
};

export const Login = async (login) => {
    const q_login = query(
        collection(database, "/Users"),
        where("username", "==", login.username)
    );
    getDocs(q_login)
    .then((snapshot) => {
        if (snapshot.empty) {
            console.log(`[ERROR] user ${login.username} or their password does not exist`);
            Deauthenticate();
            return;
        }
        const userItems = snapshot.docs.map((doc) => ({
            id : doc.id,
            userData: doc.data()
        }));
        if(userItems.length > 1) {
            console.log(`[ERROR] user ${login.username} has multiple entries`);
            Deauthenticate(login);
            return;
        }
        if(compare(login.password, userItems[0].userData.password)) {
            console.log(`[DEBUG] user ${login.username}  entered a matching  password`);
            Authenticate(login, userItems[0].userData.servers);
        } else {
            console.log(`[ERROR] user ${login.username} entered an incorrect password`);
            Deauthenticate(login);
        }
    });
    //setIsLoggedIn(true);
};

