import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

class ChartLine extends Component {
  state = {
    labels: ["April", "May", "June", "July", "August"],
    datasets: [
      {
        label: "Confirmed",
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(0, 20, 173,0.5)",
        borderColor: "rgba(0, 20, 173,1)",
        borderWidth: 2,
        data: [34866, 190649, 585795, 1697068, 3231768],
        //deaths
      },
      {
        label: "Deceased",
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(99, 99, 99,0.5)",
        borderColor: "rgba(99, 99, 99,1)",
        borderWidth: 2,
        data: [1154, 5406, 17411, 36566, 59624],
      },
      {
        label: "Recovered",
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(3, 252, 48,0.5)",
        borderColor: "rgba(3, 252, 48,1)",
        borderWidth: 2,
        data: [9059, 91862, 347840, 1095538, 2467245],
      },
    ],
  };
  componentDidMount() {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((response) => {
        console.log(response.data.statewise);
        this.setState({
          statewise: response.data.statewise,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errMsg: "Error retreiving data" });
      });
  }
  render() {
    const { statewise } = this.state;
    return (
      <div>
        <h1>{console.log("statewise:", statewise)}</h1>
        <Line
          data={this.state}
          options={{
            title: {
              display: false,
              text: "CovidCases",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

export default ChartLine;
// export default class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Line
//           data={state}
//           options={{
//             title: {
//               display: true,
//               text: "Average Rainfall per month",
//               fontSize: 20,
//             },
//             legend: {
//               display: true,
//               position: "right",
//             },
//           }}
//         />
//       </div>
//     );
//   }
// }
