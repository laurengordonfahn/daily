import React from 'react';

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
        console.log(email1,password1);
        this.props.onSignUp(email1, email2, password1, password2);
    }



    render(){
        return(

            <div id="signUpDiv"> 
                <div className="welcomeMsgDiv">
                    <h1 className="welcomeMsg"> Welcome to Daily; <br/> The emotion tracking calendar! </h1>
                    
                </div>
                <div id="signUpFormDiv">
                    <h3 id="signUpLable"> SignUp for Daily: </h3>
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

export default SignUp;