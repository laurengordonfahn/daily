import React from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import Notice from './notice';


class Homepage extends React.Component {
    constructor(){
        super();
        this.clearStatus = this.clearStatus.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.onSingIn = this.onSignIn.bind(this);
    }


    /// Notices ///
    clearStatus(){
        const statusMsgState = {...this.state.statusMsg};
        if (statusMsgState) {
            setTimeOut(() => {this.setState({statusMsg: {}})}, 10000);
        }

    }

    /// SignUp ////

    onSignUp(email1, email2, password1, password2){
        $.ajax({
            url: "/signUp",
            type: "POST",
            dataType: 'json',
            cache: false,
            data: {'email1': email1, 'email2': email2,'password1': password1, 'password2': password2 },
            success: function(response) {
                const status = response["status"];
                if( status !== 'ok'){
                    this.setState({statusMsg: response});
                    this.clearStatus();
                
                } else{
                    this.setState.isLoggedIn({isLoggedIn: response["isLoggedIn"]});
                }

            };
        });

    }

     /// SignIn ////

    onSignIn(email, password){
        $.ajax({
            url: "/signIn",
            type: "POST",
            dataType: 'json',
            cache: false,
            data: {'email': email, 'password': password},
            success: function(response) {
                const status = response.status;
                if( status !== 'ok'){
                    this.setState({statusMsg: response});
                    this.clearStatus();
                
                } else{
                    this.setState.isLoggedIn({isLoggedIn: response["isLoggedIn");
                }

            };
        });

    }

    render(){
        const statusMsg = this.state.statusMsg;
        return(
            <div>

                <Notices msg={statusMsg} clearStatus={this.clearStatus}/>
                <SignUp onSignUp={this.onSignUp} />
                <SignIn onSignIn={this.onSignIn} />
                <Welcome />

            </div>
            )
    }

}

export default HomePage;