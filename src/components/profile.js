import React from 'react';

class Profile extends React.Component {
    

    render(){
        const isLoggedIn = this.props.isLoggedIn;
        const profile = this.props.profile;

        if (!profile){
            return(

                <button className="menu" onClick={() => this.props.handleProfile(isLoggedIn)}>
                    Profile 
                </button>
                
            );
        }

        return(

            <button className="menu" onClick={() => this.props.handleProfile(isLoggedIn)}>
                Calendar
            </button>
                
        );


    }
}

export default Profile;