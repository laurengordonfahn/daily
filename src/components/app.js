import React from "react";

import $ from "jquery";

import HomePage from "./homePage";
import Calendar from "./calendar";

class App extends React.Component {
    constructor() {
        super();
        this.clearStatus = this.clearStatus.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    state = {
        isLoggedIn: false,
        statusMsg: {}
    };

    clearStatus() {
        const statusMsgState = { ...this.state.statusMsg };
        if (statusMsgState) {
            this.props.setTimeout(
                function() {
                    this.setState({ statusMsg: {} });
                }.bind(this),
                10000
            );
        }
    }

    /// SignUp ////

    onSignUp(email1, email2, password1, password2) {
        $.ajax({
            url: "/signUp",
            type: "POST",
            dataType: "json",
            cache: false,
            data: {
                email1: email1,
                email2: email2,
                password1: password1,
                password2: password2
            },
            success: function(response) {
                const status = response["status"];
                if (status !== "ok") {
                    this.setState({ statusMsg: response });
                    this.clearStatus();
                } else {
                    this.setState.isLoggedIn({
                        isLoggedIn: response["isLoggedIn"]
                    });
                }
            }.bind(this)
        });
    }

    /// SignIn ////

    onSignIn(email, password) {
        $.ajax({
            url: "/signIn",
            type: "POST",
            dataType: "json",
            cache: false,
            data: { email: email, password: password },
            success: function(response) {
                const status = response.status;
                if (status !== "ok") {
                    let msgState = { ...this.state.statusMsg };
                    Object.keys(msgState).forEach(elem => {
                        return delete msgState.elem;
                    });
                    console.log(response instanceof Object);
                    msgState = response;
                    this.setState({ statusMsg: msgState });
                    this.clearStatus();
                } else {
                    this.setState({ isLoggedIn: response["isLoggedIn"] });
                    console.log(
                        "Homepage is Running is logged in is",
                        this.state.isLoggedIn
                    );
                }
            }.bind(this)
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        console.log("App.js running", this.state.isLoggedIn);

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

        return <Calendar clearStatus={this.clearStatus} />;
    }
}

export default App;
