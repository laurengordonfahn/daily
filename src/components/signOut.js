import React from "react";
import PropTypes from 'prop-types';

class SignOut extends React.Component {
    render() {
        return (
            <div>
                <button className="menu" onClick={this.props.onSignOut}> SignOut </button>
            </div>
        );
    }
}
 
SignOut.propTypes = {
    onSignOut: PropTypes.func
};

export default SignOut;
