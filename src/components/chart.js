import React from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends React.Component {
    constructor(){
        super();
        this.renderGraphs = this.renderGraphs.bind(this);
    }

    renderGraphs(emotion, colorChart){
        console.log("colorChart for render graph", {colorChart}, {emotion})

        console.log(colorChart[emotion]["emotionArr"], colorChart[emotion]["after"], colorChart[emotion]["colorHexs"]);
        
        const dataAfter = {
                labels: colorChart[emotion]["emotionArr"],
                datasets: [
                    {
                        label: `${emotion} After`,
                        data: colorChart[emotion]["after"], 
                        backgroundColor: colorChart[emotion]["colorHexs"]
                           ,
                        borderColor:colorChart[emotion]["colorHexs"],
                        borderWidth: 1,
                        scaleStepWidth:1,
                        barThickness: 50,
                        fixedStepSize: 1,
                        stepSize: 1,
                        max: 5, 
                        min: 5

                    }
                ]
        };
        const dataBefore = {
                labels: colorChart[emotion]["emoitonArr"],
                datasets: [
                    {
                        label: `${emotion} Before`,
                        data: colorChart[emotion]["before"], 
                        backgroundColor: colorChart[emotion]["colorHexs"]
                           ,
                        borderColor:colorChart[emotion]["colorHexs"],
                        borderWidth: 1,
                        scaleStepWidth:1,
                        barThickness: 50,
                        fixedStepSize: 1,
                        stepSize: 1,
                        max: 5,
                        min: 5

                    }
                ]
        };
        const options = {
                scales: {
                    // maintainAspectRatio: false,
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            scaleStepWidth:1,
                            // barThickness: 50,
                            fixedStepSize: 1,
                            stepSize: 1,
                            // max: 5

                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero:true,
                            scaleStepWidth:1,
                            // barThickness: 50,
                            fixedStepSize: 1,
                            stepSize: 1,
                            // max: 5

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