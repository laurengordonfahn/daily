import React from 'react';
import ReactTimeout from 'react-timeout'

import $ from 'jquery';

import SignIn from './signIn';
import SignUp from './signUp';
import Notices from './notices';
import Welcome from './welcome';


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
             this.props.setTimeout(() => {this.setState({statusMsg: {}})}, 10000);
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

            }.bind(this)
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
                
                } else {
                    this.setState({isLoggedIn: response["isLoggedIn"]});
                }

            }.bind(this)
        });

    }

    render(){

        return(
            <div>
                <SignIn onSignIn={this.onSignIn} />
                <Notices msg={this.props.msg} clearStatus={this.clearStatus}/>
                <SignUp onSignUp={this.onSignUp} />
                
                <Welcome />
            </div>
            )
    }

}

export default ReactTimeout(Homepage);