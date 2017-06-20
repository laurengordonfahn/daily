import React from 'react';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2';

class Chart extends React.Component {
    constructor(){
        super();
        this.renderGraphs = this.renderGraphs.bind(this);
    }

    renderGraphs(emotion, colorChart){

        const arrLen = colorChart[emotion]["emotionArr"].length
        const borderArr = Array.apply(null, Array(arrLen)).map(String.prototype.valueOf,"black")

        const emotionName = emotion.charAt(0).toUpperCase() + emotion.slice(1);
        
        const dataAfter = {
                labels: colorChart[emotion]["emotionArr"],
                datasets: [
                    {
                        label: `${emotionName} After`,
                        data: colorChart[emotion]["after"], 
                        backgroundColor: colorChart[emotion]["colorHexs"],
                        borderColor: borderArr,
                        borderWidth: 1
                    

                    }
                ]
        };
        const dataBefore = {
                labels: colorChart[emotion]["emotionArr"],
                datasets: [
                    {
                        label: `${emotionName} Before`,
                        data: colorChart[emotion]["before"], 
                        backgroundColor: colorChart[emotion]["colorHexs"],
                        borderColor:borderArr,
                        borderWidth: 1,

                        
                    }
                ]
        };
        const options = {
                legend: {labels:{fontColor:"black", fontSize: 18}},
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true, 
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero:true,
                            scaleStepWidth:1,
                            fixedStepSize: 1,
                            stepSize: 1

                        }
                    }]
                }
        };

        return(
            <div className="barGraphsDiv" key={emotion} >
            <div className="explainationBarChart">
                <p>     
                    Frequency of a(n) {emotion} day occuring a day 'Before'  or a day 'After' a given emotion.
                </p>
            </div>
                <div className="barGraphBefore">
                    
                    <Bar data={dataBefore} options={options} />
                </div>
                <div className="barGraphAfter">
                    <Bar data={dataAfter} options={options} />
                </div>
            </div>
        );

    }

    render(){
        const colorChart = this.props.colorChart;
        const emotionArray = Object.keys(colorChart);
        
        return (
            <div>
                {emotionArray.map(emotion => {
                    return this.renderGraphs(emotion, colorChart);
                })} 
            </div>
                
        );
    }
}

Chart.propTyes = {
    colorChart : PropTypes.shape({
        emotion: PropTypes.object})
};

export default Chart;