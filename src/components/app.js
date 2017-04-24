import React from 'react';

import HomePage from './homePage';
import Calendar from './calendar';

class App extends React.Component {

    state = {
        isLoggedIn: false,
        statusMsg: {}
    };

    render(){
        const isLoggedIn= this.state.isLoggedIn;

        if (!isLoggedIn){
            return < HomePage msg={this.state.statusMsg} />;      
        }

        return < Calendar />;
        
    }
}

export default App;

