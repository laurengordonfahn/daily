import React from "react";

function Notices(props) {
    const msg = props.msg;
    return (
        <div>
            {Object.keys(msg)
                .filter(elem => {
                    return elem !== "status";
                })
                .forEach(message => {
                    return <h3 id="notices"> {msg[message]} </h3>;
                })}
        </div>
    );
}

export default Notices;
