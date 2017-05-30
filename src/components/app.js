import React from "react";
import ReactTimeout from "react-timeout";
import HttpsRedirect from 'react-https-redirect';

// import $ from "jquery";

import HomePage from "./homePage";
import Calendar from "./calendar";

import * as api from '../api'

class App extends React.Component {
    constructor() {
        super();

        const accessToken = window.sessionStorage.getItem("accessToken");
        this.state = {
            isLoggedIn: !!accessToken,
            statusMsg: {}, 
            accessToken: accessToken || null,
        };

        this.clearStatus = this.clearStatus.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }

    

    clearStatus() {
        this.props.setTimeout(
            function() {
                this.setState({ statusMsg: {} });
            }.bind(this),
            10000
        );
    }

    // // // FOR LOCAL TESTING ONLY
    componentDidMount() {
        // this.onSignInSuccess("b@gmail.com", "b12345");
    }

    /// SignUp ////
    onSignUpSuccess(response) {
        const notices = response["notices"];
        if (!response["isLoggedIn"]) {

            let presentStatusMsg = { ...this.state.statusMsg };
            Object.keys(presentStatusMsg).forEach(elem => {
                return delete presentStatusMsg.elem;
            });

            Object.keys(notices).forEach(notice => {
                return (presentStatusMsg[notice] = notices[notice]);
            });

            this.setState({ statusMsg: presentStatusMsg });
            this.clearStatus();
            
        } else {
            
            this.setState({
                isLoggedIn: response["isLoggedIn"]
            });
        }
    }

    onSignUp(email1, email2, password1, password2) {
        api.signUp(email1, email2, password1, password2)
            .then(response => this.onSignUpSuccess(response))
    }

    /// SignIn ////

    onSignInSuccess(response) {
        const status = response.status;
        const notices = response.notices;
        
        if (status === "ok" && response["isLoggedIn"] === false) {
            let msgState = { ...this.state.statusMsg };
            Object.keys(msgState).forEach(elem => {
                return delete msgState.elem;
            });

            Object.keys(notices).forEach(notice => {
                return (msgState[notice] = notices[notice]);
            });

            this.setState({ statusMsg: response["notices"] });
            this.clearStatus();

        } else if (status === "ok" && response["isLoggedIn"] === true) {
            this.setState({ isLoggedIn: response["isLoggedIn"], accessToken : response["access_token"] });
        }

    }

    onSignIn(email, password) {
        api.signIn(email, password)
            .then(response => this.onSignInSuccess(response))
    }

    /// SignOut ////

    onSignOutSuccess(response) {
    
        this.setState({ isLoggedIn: false });
           
        
    }

    onSignOut() {
        api.signOut()
            .then(response => this.onSignOutSuccess(response))
    } 

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        if (!isLoggedIn) {
            return (
                <HttpsRedirect>   
                    <HomePage
                        msg={this.state.statusMsg}
                        clearStatus={this.clearStatus}
                        onSignIn={this.onSignIn}
                        onSignUp={this.onSignUp}
                    />
                </HttpsRedirect>                
            );
        }

        return (
            <HttpsRedirect> 
                <Calendar
                    isLoggedIn={this.state.isLoggedIn}
                    msg={this.state.statusMsg}
                    clearStatus={this.clearStatus}
                    onSignOut={this.onSignOut}
                />
            </HttpsRedirect> 
        );
    }
}

export default ReactTimeout(App);
