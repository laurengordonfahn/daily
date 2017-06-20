import React from 'react';

function Welcome(props) {

    return(
        <div id="explanation">

            <div className="intro">  
                <div className="introHeader"> The Steps: </div>
                <div className="introLine"> <span className="introNum">1) </span> Sign Up using just your email </div>
                <div className="introLine"> <span className="introNum">2) </span> Your personal private calendar will appear </div>
                <div className="introLine"> <span className="introNum">3) </span> Start by adding three adjectives and a color for the day </div>
            </div>

        </div>
        )

}

export default Welcome;