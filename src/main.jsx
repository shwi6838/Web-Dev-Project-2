import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import './App.css'
import { Servers } from './components/Servers'
import { Welcome } from './components/Welcome'

import { auth } from '/firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'

//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

let instance = null;
let welcome = null;

function App(props) {
  if (instance == null) instance = new Servers(props, server_names);
  if (welcome == null) welcome = new Welcome(props);
  const [current_server, setCurrentServer] = useState(null);
  const [update, setUpdate] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    console.log('[DEBUG] Changed current server');
  }, [current_server]);  
  useEffect(() => {
    console.log('[DEBUG] Updated DOM');
  }, [update]);
  useEffect(() => {
    console.log('[DEBUG] Updated DOM w/ login', login);
  }, [login]);
  props.children.current_server = current_server;
  props.children.setCurrentServer = setCurrentServer;
  props.children.update = update;
  props.children.setUpdate = setUpdate;
  props.children.login = login;
  props.children.setLogin = setLogin;
  const [user] = useAuthState(auth);
  return (
    <div className='main'>
      {(!login) ? (welcome.render()) : (instance.render())}
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App>{{"current_server": null, "setCurrentServer": () => {}}}</App>
  </StrictMode>,
)