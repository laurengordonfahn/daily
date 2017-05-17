import React from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends React.Component {
    constructor(){
        super();

    
    }

    

    render(){
        const data = {
                labels: ["Trapped", "Sad"],
                datasets: [
                    {
                        label: 'Anxious Before',
                        data: [3, -2], 
                        backgroundColor: [
                            '#ffa024',
                            '#962686'
                        ],
                        borderColor:[
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1

                    }, {
                        label: 'Anxious After',
                        data: [5, -3], 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54,162, 235, 0.2)'
                        ],
                        borderColor:[
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
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
        
        
        return (
            <div>
                <div width="200px" height="200px">
                    <Bar data={data} options={options}  />
                </div>
            
            </div>
                
        );


    }
}

export default Chart;