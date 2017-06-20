import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
    

    render(){
        const isLoggedIn = this.props.isLoggedIn;
        const profile = this.props.profile;

        if (!profile){
            return(
                <div className="selectViewButtonDiv">
                    <button className="menu" onClick={() => this.props.handleProfile(isLoggedIn)}>
                        Profile 
                    </button>
                </div>
                
            );
        }

        return(
            <div className="selectViewButtonDiv">
                <button className="menu" onClick={() => this.props.handleProfile(isLoggedIn)}>
                    Calendar
                </button>
            </div>
                
        );


    }
}

Profile.propTypes = {
    isLoggedIn: PropTypes.bool,
    profile: PropTypes.bool,
    handleProfile: PropTypes.func

};
export default Profile;