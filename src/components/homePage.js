import React from "react";
import ReactTimeout from "react-timeout";

import SignIn from "./signIn";
import SignUp from "./signUp";
import Notices from "./notices";
import Welcome from "./welcome";

class Homepage extends React.Component {
    render() {
        const msg = this.props.msg;
        console.log(Object.keys(msg).length);

        if (Object.keys(msg).length > 1) {
            return (
                <div>
                    <SignIn onSignIn={this.props.onSignIn} />
                    <Notices
                        msg={this.props.msg}
                        clearStatus={this.props.clearStatus}
                    />
                    <SignUp onSignUp={this.props.onSignUp} />

                    <Welcome />
                </div>
            );
        } else {
            return (
                <div>
                    <SignIn onSignIn={this.props.onSignIn} />
                    <SignUp onSignUp={this.props.onSignUp} />

                    <Welcome />
                </div>
            );
        }
    }
}

export default ReactTimeout(Homepage);
