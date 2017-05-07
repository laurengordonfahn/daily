import React from "react";

class SignOut extends React.Component {
    render() {
        return (
            <div>
                <button className="menu" onClick={this.props.onSignOut}> SignOut </button>
            </div>
        );
    }
}

export default SignOut;
