import React, { Component } from "react";
import Chart from "react-apexcharts";

class ApexChart extends Component {
  constructor(props) {
    super(props);
    const xaxis = props.chartData.map(data => data.title);
    const yaxis = props.chartData.map(data => data.post);
    //const color = props.chartData.map(data => data.color);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: xaxis
        },
        fill: {
            colors: ['#22C55E']
        },
        grid: {
            show: false
        }, 
        dataLabels: {
            enabled: false
        }
      },
      series: [
        {
          name: "series-1",
          data: yaxis
         },

        // {
        //   name: "series-2",
        //   data: [50, 20, 78, 30, 60, 20, 50, 31]
        // }
      ]
    };
  }

  render() {
    return (
      <div className="w-full md:w-[80%] lg:w-[70%] mx-auto my-3">
        <div className="row">
          <div className="">
            <h1 className="text-xl text-center font-semibold md:text-2xl lg:text-4xl my-5 text-green-500 ">
                Activity Report
            </h1>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={600}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexChart;