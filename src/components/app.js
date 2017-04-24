import React from 'react';
import SignIn from './signIn';
import SignUp from './signUp';

class App extends React.Component {
    constructor(){
        super();
        
    }

    state = {
        isLoggedIn: false,
        statusMsg: {}
    };

    render(){
        const isLoggedIn= this.state.isLoggedIn;

        if (not isLoggedIn){
            return(
                 < HomePage />;
                
        }
        return < Calendar />;
        
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('main'));
