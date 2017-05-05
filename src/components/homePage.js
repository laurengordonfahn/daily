import React from "react";

import SignIn from "./signIn";
import SignUp from "./signUp";
import Notices from "./notices";
import Welcome from "./welcome";

class Homepage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h1> Daily </h1>
                    <SignIn onSignIn={this.props.onSignIn} />
                </div>
                <Notices
                    msg={this.props.msg}
                    clearStatus={this.props.clearStatus}
                />
                <SignUp onSignUp={this.props.onSignUp} />

                <Welcome />
            </div>
        );
    }
}

export default Homepage;
