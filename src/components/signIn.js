import React from "react";

class SignIn extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const email = this.email.value;
        const password = this.password.value;
        document.getElementById("signInForm").reset();
        this.props.onSignIn(email, password);
    }

    render() {
        return (
            <div>
                <h3> SignIn: </h3>
                <form id="signInForm">
                    <input
                        type="text"
                        ref={input => {
                            this.email = input;
                        }}
                        placeholder="email"
                    />
                    <input
                        type="password"
                        ref={input => {
                            this.password = input;
                        }}
                        placeholder="password"
                    />
                    <input
                        type="submit"
                        value="SignIn"
                        onClick={e => {
                            this.handleClick(e);
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default SignIn;
