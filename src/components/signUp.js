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
        this.props.onSignUp(email1, email2, password1, password2);
    }



    render(){
        return(

            <div> 
                <form> 
                    <h3> email: </h3>
                    <input type="text" ref={(input) =>{this.email1 = input; }}/>
                    <h3> retype your email: </h3>
                    <input type="text" ref={(input) =>{this.email2 = input; }}/>
                    <h3> password: </h3>
                    <input type="password" ref={(input) =>{this.password1 = input; }}/>
                    <h3> retype your password: </h3>
                    <input type="password" ref={(input) =>{this.password2 = input; }}/>
                    <input type="submit" value="SignUp" onClick={(e)=>{this.handleClick(e)}}/>  
                </form>
            </div>
        )
    }
}

export default SignUp;