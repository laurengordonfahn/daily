import React from "react";
import ReactTimeout from "react-timeout";

import $ from "jquery";

import HomePage from "./homePage";
import Calendar from "./calendar";

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
                const notices = response.notices;
                if (status === "ok") {
                    if (notices) {
                        let presentStatusMsg = { ...this.state.statusMsg };
                        Object.keys(presentStatusMsg).forEach(elem => {
                            return delete presentStatusMsg.elem;
                        });

                        Object.keys(notices).forEach(notice => {
                            return (presentStatusMsg[notice] = notices[notice]);
                        });

                        this.setState({ statusMsg: response["notices"] });
                        this.clearStatus();
                    }
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
                const notices = response.notices;
                console.log({ notices });
                if (status === "ok" && notices) {
                    let msgState = { ...this.state.statusMsg };
                    Object.keys(msgState).forEach(elem => {
                        return delete msgState.elem;
                    });
                    console.log(response instanceof Object);

                    Object.keys(notices).forEach(notice => {
                        return (presentStatusMsg[notice] = notices[notice]);
                    });

                    this.setState({ statusMsg: response["notices"] });
                    this.clearStatus();
                } else if (status === "ok" && !notices) {
                    this.setState({ isLoggedIn: response["isLoggedIn"] });
                    console.log(
                        "Homepage is Running is logged in is",
                        this.state.isLoggedIn
                    );
                }
            }.bind(this)
        });
    }

    /// SignOut ////

    onSignOut() {
        $.ajax({
            url: "/signOut",
            type: "DELETE",
            cache: false,
            success: function(response) {
                this.setState({ isLoggedIn: false });
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

        return (
            <Calendar
                msg={this.state.statusMsg}
                clearStatus={this.clearStatus}
                onSignOut={this.onSignOut}
            />
        );
    }
}

export default ReactTimeout(App);
