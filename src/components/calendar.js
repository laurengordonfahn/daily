import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import SignOut from './notices';
import Month from './month';
import SelectView from './selectview';
import Profile from './profile';


class Calendar extends React.Component{

    constructor(){
        super();
        this.renderDate = this.renderDate.bind(this);
        this.fillDateStore = this.fillDateStore.bind(this);
        this.clearStatus = this.clearStatus.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.handleDateSelection = this.handleDateSelection.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        
    }

    state = {
        isLoggedIn : false,
        today : null,
        month : null,
        year : null,
        statusMsg: {},

        // all dates in the database "d/m/y": {adj1:adj, adj2:adj, adj3:adj, colorSet:hex}
        dayContent: {},
        // ["d/m/y ", "d/m/y"]

        dateArray: [], 

        //all date month and years in database month/year 
        dateRange:[],

        //on sign in auto to today's month can change from 'present' to a month/year setting that user requests
        view : []  
    };

    componentWillMount(){
        this.renderDate();
        this.fillDateStore();

    }

    ////// componentWillMount ///////
    renderDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        this.setState({ today })
        this.setState({ month })
        this.setState({ year })
        this.setState({view: [ month, year]})

        $.ajax({
            url: "/month",
            dataType: 'json', 
            cache: false,
            data: {month: month, year: year},
            success: function(response) {
                //Complete setState below 
                this.setState({dateStore: response.date.keys() });

            }.bind(this)

        });

    }

    fillDateStore() {

        $.ajax({
            url: "/calendar",
            dataType: 'json', 
            cache: false,
            success: function(response) {
                //TODO dateHistory: [month/year, month, year]
                // TODO check what happens when no response content

                this.setState({dateRange: response.dateHistory });

            }.bind(this)

        });

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

            }
        })

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

            }
        })

    }

     /// SignOut ////

    onSignOut(){
        $.ajax({
            url: "/signOut",
            type: "DELETE",
            cache: false,
            success: function(response) {
                const status = response.status;
                if( status !== 'ok'){
                    this.setState({statusMsg: response.status});
                    this.clearStatus();
                
                } else{
                    this.setState.isLoggedIn({isLoggedIn: false});
                }

            }
        })

    }
    /// SelectView ////

    handleDateSelection(event){
        const dateSelected = [event.target.value];
        this.setState({view: dateSelected})

        $.ajax({
            url: "/view",
            dataType: 'json', 
            cache: false,
            data: {dateRequest: this.state.view},
            success: function(response) {
                //TODO dateHistory: [month/year, month, year]
                // TODO check what happens when no response content

                this.setState({dateArray: response.dateArray});
                this.setState({dayContent: response.dayContent});
                this.setState({month: response.month});
                this.setState({year: response.year});

            }.bind(this)

        });

        
    }
    
    handleColorChange(event, dayDate){
        const dayState = {...this.state.dayContent};
        dayState.dayDate.color = event.target.value;
        this.setState({dayContent : dayState});
    }


    render(){
        const isLoggedIn = this.state.isLoggedIn;
        const statusMsg = this.state.statusMsg;
        return(

            <div>
                <h2> Hello </h2>
                < Notices msg={statusMsg} clearStatus={this.clearStatus} />
                < LogInState isLoggedIn={isLoggedIn} onSignUp={this.onSignUp}onSignIn={this.onSignIn} onSignOut={this.onSignOut}/>
                < Profile />
                < SelectView onDateSelection={this.handleDateSelection} />
                < Month handleColorChange={this.handleColorChange} />

            </div>

            )
    }

}

ReactDOM.render(<Calendar />, document.getElementById('main'));

export default Calendar 