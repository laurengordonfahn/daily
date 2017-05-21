import React from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends React.Component {
    constructor(){
        super();
        this.renderGraphs = this.renderGraphs.bind(this);
    }

    renderGraphs(emotion, colorChart){
        console.log("colorChart for render graph", {colorChart}, {emotion})

        console.log(colorChart[emotion]["emotionArr"], colorChart[emotion]["after"], colorChart[emotion]["before"], colorChart[emotion]["colorHexs"]);

        const arrLen = colorChart[emotion]["emotionArr"].length
        const borderArr = Array.apply(null, Array(arrLen)).map(String.prototype.valueOf,"black")
        
        const dataAfter = {
                labels: colorChart[emotion]["emotionArr"],
                datasets: [
                    {
                        label: `${emotion} After`,
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
                        label: `${emotion} Before`,
                        data: colorChart[emotion]["before"], 
                        backgroundColor: colorChart[emotion]["colorHexs"],
                        borderColor:borderArr,
                        borderWidth: 1,

                        
                    }
                ]
        };
        const options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true, 
                            // scaleStepWidth:1,
                            // fixedStepSize: 1,
                            // stepSize: 1
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

export default Chart;