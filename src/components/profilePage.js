import React from 'react';
import PropTypes from 'prop-types';
import Profile from "./profile";
import SignOut from "./signOut";
import Chart from "./chart";


class ProfilePage extends React.Component {
    

    render(){
       
        return(
            <div> 
                <div className="profileButtons">
                    <SignOut onSignOut={this.props.onSignOut} />
                    <Profile profile={this.props.profile} isLoggedIn={this.props.isLoggedIn} handleProfile={this.props.handleProfile} />
                    
                </div>

                <Chart colorChart={this.props.colorChart} />
            </div> 
        );
    }
}

ProfilePage.propTypes = {
    profile: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    handleProfile: PropTypes.func,
    onSignOut: PropTypes.func,
    colorChart: PropTypes.shape({
        emotion: PropTypes.object})
};
export default ProfilePage;