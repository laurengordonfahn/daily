import React from "react";
import PropTypes from 'prop-types';

import SignIn from "./signIn";
import SignUp from "./signUp";
import Notices from "./notices";
import Welcome from "./welcome";

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div id="homepageHeader">
                    <div id="appName"> Daily </div>
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

HomePage.propTypes = {
    onSignIn: PropTypes.func,
    msg: PropTypes.objectOf(PropTypes.string),
    clearStatus: PropTypes.func,
    onSignUp: PropTypes.func
};

export default HomePage;
