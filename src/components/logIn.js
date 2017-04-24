import React from 'react';
import SignIn from './signIn';
import SignUp from './signUp';

class LogIn extends React.Component {
    

    render(){
        return(

            <div> 
                < SignIn />
                < SignUp onSignUp={this.onSignUp}/>
            </div>
        )
    }
}

export default LogIn;