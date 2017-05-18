import React from 'react';
import Profile from "./profile";
import SignOut from "./signOut";
import Chart from "./chart";


class ProfilePage extends React.Component {
    

    render(){
       
        return(
            <div> 
                <Profile profile={this.props.profile} isLoggedIn={this.props.isLoggedIn} handleProfile={this.props.handleProfile} />
                <SignOut onSignOut={this.props.onSignOut} />

                <Chart colorChart={this.props.colorChart} />
            </div>



           
            
        );
    }
}

export default ProfilePage;