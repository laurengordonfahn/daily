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
                        borderWidth: 1

                    }
                ]
        };
        const dataBefore = {
                labels: colorChart[emotion]["emoitonArr"],
                datasets: [
                    {
                        label: `${emotion} Before`,
                        data: colorChart[emotion]["after"], 
                        backgroundColor: colorChart[emotion]["colorHexs"]
                           ,
                        borderColor:colorChart[emotion]["colorHexs"],
                        borderWidth: 1

                    }
                ]
        };
        const options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
        };

        return(
            <div key={emotion} >
                <Bar data={dataAfter} options={options}  />
                <Bar data={dataBefore} options={options} />
            </div>
        );

    }

    //colorChart[emotion] = {"after": response["after"], "before": response["before"],"colorHexs": colorHexs, "emotionArr" : emotionArr}

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