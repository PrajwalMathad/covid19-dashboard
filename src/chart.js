import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = (props) => {
    return (
        <Line
                width={500}
                height={180}
                data={{
                  labels: props.chartLabels,
                  datasets: [
                    {
                      label: 'Confirmed',
                      fill: false,
                      lineTension: 0.5,
                      color: 'rgb(239,245,252,1)',
                      backgroundColor: 'rgb(68,138,255,1)',
                      pointBackgroundColor: 'rgb(68,138,255,0.8)',
                      borderColor: 'rgb(68,138,255,1)',
                      borderWidth: 2,
                      data: props.confirmedLine
                    },
                    {
                      label: 'Deaths',
                      fill: false,
                      lineTension: 0.5,
                      color: 'rgb(239,245,252,1)',
                      backgroundColor: 'rgb(255,82,82,1)',
                      pointBackgroundColor: 'rgb(255,82,82,0.8)',
                      borderColor: 'rgb(255,82,82,1)',
                      borderWidth: 2,
                      data: props.deathLine
                    },
                    {
                      label: 'Recovered',
                      fill: false,
                      lineTension: 0.5,
                      color: 'rgb(239,245,252,1)',
                      backgroundColor: 'rgb(178,255,89,1)',
                      pointBackgroundColor: 'rgb(178,255,89,0.8)',
                      borderColor: 'rgb(178,255,89,1)',
                      borderWidth: 2,
                      data: props.recoveredLine
                    }
                  ]
                }}
                options={{
                  title: {
                    display: false
                  },
                  legend: {
                    display: true,
                    position: 'top'
                  }
                }}
              />
    )
}

export default Chart;