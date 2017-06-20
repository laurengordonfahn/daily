import React from 'react';
import PropTypes from 'prop-types';

class SignUp extends React.Component {
    
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        const email1 = this.email1.value;
        const email2 = this.email2.value;
        const password1 = this.password1.value;
        const password2 = this.password2.value;
        document.getElementById('signUpForm').reset();
        
        this.props.onSignUp(email1, email2, password1, password2);
    }



    render(){
        return(

            <div id="signUpDiv"> 
                <div className="welcomeMsgDiv">
                    <div className="welcomeMsg"> Welcome to Daily; <br/> The emotion tracking calendar! </div>
                    
                </div>
                <div id="signUpFormDiv">
                    <div id="signUpLable"> SignUp for Daily: </div>
                    <form id="signUpForm"> 
                        
                        <input className="singUpInput" type="text" ref={(input) =>{this.email1 = input; }} placeholder="email"/>
                        <input className="singUpInput" type="text" ref={(input) =>{this.email2 = input; }} placeholder="retype your email"/>
                        <br/>
                        <input className="singUpInput" type="password" ref={(input) =>{this.password1 = input; }} placeholder="password"/>
                        <input className="singUpInput" type="password" ref={(input) =>{this.password2 = input; }} placeholder="retype your password" />
                        <br/>
                        <input type="submit" id="signUpButton" value="SignUp" onClick={(e)=>{this.handleClick(e)}}/>  
                    </form>
                </div>
            </div>
        )
    }
}

SignUp.propTypes = {
    onSignUp: PropTypes.func
};
export default SignUp;