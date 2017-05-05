import React from "react";


function Notices(props) {
    const msg = props.msg;
    if (msg) {
        return (
            <div id"notices">
               {Object.keys(msg)
                    .filter(elem => {
                        return elem !== "status";
                    })
                    .map(message => {
                        return <h3 className="notices" key={message}> {msg[message]} </h3>;
                    })}
                
            </div>
        );
    } else {
        return (
            <div>
                <h3> "What can I say about a day?" </h3>
            </div>
        );
    }
}

export default Notices;
