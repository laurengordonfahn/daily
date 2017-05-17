import React from "react";
import ReactTimeout from "react-timeout";

// import $ from "jquery";

import HomePage from "./homePage";
import Calendar from "./calendar";

import * as api from '../api'

class App extends React.Component {
    constructor() {
        super();
        this.clearStatus = this.clearStatus.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }

    state = {
        isLoggedIn: false,
        statusMsg: {}
    };

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
        this.onSignInSuccess("b@gmail.com", "b12345");
    }

    /// SignUp ////
    onSignUpSuccess(response) {
        console.log("onSignup Response Running", { response });
        ///
        const status = response["status"];
        console.log(status);

        const notices = response["notices"];
        if (!response["isLoggedIn"]) {
            console.log("isLoggedIn is false");

            let presentStatusMsg = { ...this.state.statusMsg };
            Object.keys(presentStatusMsg).forEach(elem => {
                return delete presentStatusMsg.elem;
            });

            Object.keys(notices).forEach(notice => {
                return (presentStatusMsg[notice] = notices[notice]);
            });

            this.setState({ statusMsg: presentStatusMsg });
            this.clearStatus();
            console.log(
                "isLoggedIn after signUp should be false",
                this.state.isLoggedIn
            );
        } else {
            console.log(notices);
            console.log("isLoggedIn is true");
            this.setState({
                isLoggedIn: response["isLoggedIn"]
            });
            console.log(
                "isLoggedIn after signUp should be true",
                this.state.isLoggedIn
            );
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
        //debug zone:
        console.log("onSignIn Response Running", { response });
        console.log({ notices });

        if (status === "ok" && response["isLoggedIn"] === false) {
            let msgState = { ...this.state.statusMsg };
            Object.keys(msgState).forEach(elem => {
                return delete msgState.elem;
            });

            Object.keys(notices).forEach(notice => {
                return (msgState[notice] = notices[notice]);
            });

            this.setState({ statusMsg: response["notices"] });
            console.log(this.state.statusMsg);
            this.clearStatus();
        } else if (status === "ok" && response["isLoggedIn"] === true) {
            this.setState({ isLoggedIn: response["isLoggedIn"] });
            console.log(
                "Homepage is Running is logged in is",
                this.state.isLoggedIn
            );
        }

    }

    onSignIn(email, password) {
        api.signIn(email, password)
            .then(response => this.onSignInSuccess(response))
    }

    /// SignOut ////

    onSignOutSuccess(response) {
    
        console.log("onSignOut Response Running", { response });
        ///
        this.setState({ isLoggedIn: false });
           
        
    }

    onSignOut() {
        api.signOut()
            .then(response => this.onSignOutSuccess(response))
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        //debug zone:
        console.log("App.js running isLoggedIn is", this.state.isLoggedIn);
        ///

        if (!isLoggedIn) {
            return (
                
                <HomePage
                    msg={this.state.statusMsg}
                    clearStatus={this.clearStatus}
                    onSignIn={this.onSignIn}
                    onSignUp={this.onSignUp}
                />
               
            );
        }

        return (
            <Calendar
                isLoggedIn={this.state.isLoggedIn}
                msg={this.state.statusMsg}
                clearStatus={this.clearStatus}
                onSignOut={this.onSignOut}
            />
        );
    }
}

export default ReactTimeout(App);
