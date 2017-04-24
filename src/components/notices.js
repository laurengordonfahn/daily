import React from 'react';

class Notices extends React.Component {
    

    render(){
        const msg = {this.props.msg};

        return(

            <div> 
                { Object.keys(msg).filter((elem) => {elem !== "status";}).forEach((message) => {
                        return <h3 id="notices"> {msg[message]}  </h3>
                    }
                }
            </div>
        )
    }
}

export default Notices;