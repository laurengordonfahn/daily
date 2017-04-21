import React from 'react';

class SignIn extends React.Component {
    

    render(){
        return(

            <div> 
                <h3> email: </h3>
                <input type="text"> 
                <h3> password: </h3>
                <input type="password"> </input>
                <input type="submit">  SignIn  </input>
            </div>
        )
    }
}

export default SignIn;