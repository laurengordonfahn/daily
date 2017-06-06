import React from "react";
import PropTypes from 'prop-types';

import SignIn from "./signIn";
import SignUp from "./signUp";
import Notices from "./notices";
import Welcome from "./welcome";

class Homepage extends React.Component {
    render() {
        return (
            <div>
                <div id="homepageHeader">
                    <h1 id="appName"> Daily </h1>
                    <SignIn onSignIn={this.props.onSignIn} />
                </div>
                <div id="emptyDiv1"/>
                <div id="emptyDiv2"/>
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

Homepage.propTypes = {
    onSignIn: PropTypes.func,
    msg: PropTypes.objectOf(PropTypes.string),
    clearStatus: PropTypes.func,
    onSignUp: PropTypes.func
};

export default Homepage;
