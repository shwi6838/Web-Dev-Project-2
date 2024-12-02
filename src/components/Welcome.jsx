import { auth } from "/firebase.js";
//import {  } from "firebase/auth";
import React, { useEffect, Component } from "react";
import "./Welcome.css";

export class Welcome extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    signIn() {
        this.props.children.setLogin(true);
    }
    signOut() {
        this.props.children.setLogin(false);
    }
    render() {
        return (<div className="welcome">
            <h1>Welcome to Discord Clone</h1>
            <p>This is a simple Discord clone built with React, Firebase, and Vite.</p>
            <button id = "sign-in" onClick = {() => {this.signIn()}}>
                <img id = "google-logo"
                src = "sign-in-google.png"
                alt = "Google logo"
                />
            </button>
        </div>);
    }
}

export default Welcome;