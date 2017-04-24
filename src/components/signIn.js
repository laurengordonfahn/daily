import React from 'react';

class SignIn extends React.Component {
    
     constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        const email = this.email.value;
        const password = this.password.value;
        this.props.onSignUp(email, password);
    }

    render(){
        return(
             <div> 
                <form> 
                    <h3> email: </h3>
                    <input type="text" ref={(input) =>{this.email = input; }} />
                    <h3> password: </h3>
                    <input type="password" ref={(input) =>{this.password = input; }}/>
                    <input type="submit" value="SignIn" onClick={(e)=>{this.handleClick(e)}}>  
                </form>
            </div>

        )
    }
}

export default SignIn;