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
                    //debug zone:
                    console.log("clearStatus Running", { statusMsgState });
                    ///
                    Object.keys(statusMsgState).forEach(elem => {
                        return delete statusMsgState.elem;
                    });
                    this.setState({ statusMsg: statusMsgState });
                }.bind(this),
                10000
            );
        }
    }

    // // FOR LOCAL TESTING ONLY
    componentDidMount() {
        this.onSignIn("b@gmail.com", "b12345");
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
                //debug zone:
                console.log("onSignup Response Running", { response });
                ///
                const status = response["status"];
                console.log(status);
                const notices = response.notices;
                console.log(notices);
                console.log(response["isLoggedIn"]);
                if (status === "ok") {
                    console.log("status is ok signUp");
                    if (response["isLoggedIn"] === false) {
                        console.log("isLoggedIn is false");
                        let presentStatusMsg = { ...this.state.statusMsg };
                        Object.keys(presentStatusMsg).forEach(elem => {
                            return delete presentStatusMsg.elem;
                        });

                        Object.keys(notices).forEach(notice => {
                            return (presentStatusMsg[notice] = notices[notice]);
                        });

                        this.setState({ statusMsg: response["notices"] });
                        this.clearStatus();
                        console.log(
                            "isLoggedIn after signUp should be false",
                            this.state.isLoggedIn
                        );
                    } else {
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
                //debug zone:
                console.log("onSignOut Response Running", { response });
                ///
                this.setState({ isLoggedIn: false });
            }.bind(this)
        });
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
                msg={this.state.statusMsg}
                clearStatus={this.clearStatus}
                onSignOut={this.onSignOut}
            />
        );
    }
}

export default ReactTimeout(App);
