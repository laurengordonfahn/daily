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
            <div className="signInDiv">
                
                <h3 className="signInLable"> SignIn: </h3>
                <form id="signInForm">
                    <input
                        className="signInInput"
                        type="text"
                        ref={input => {
                            this.email = input;
                        }}
                        placeholder="email"
                    />
                    <input
                        className="signInInput"
                        type="password"
                        ref={input => {
                            this.password = input;
                        }}
                        placeholder="password"
                    />
                    <input id="signInButton"
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
