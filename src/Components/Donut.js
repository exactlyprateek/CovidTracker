import React, { Component } from "react";
import axios from "axios";
// import { Pie, Doughnut } from "react-chartjs-2";

import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Connector,
  Export,
} from "devextreme-react/pie-chart";

// import { populationByRegions } from "./data.js";

class Donut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      recovered: 0,
      deaths: 0,
      posts: [],
      error: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((response) => {
        console.log(response.data.statewise[0]);
        this.setState({
          active: response.data.statewise[0].active,
          recovered: response.data.statewise[0].recovered,
          deaths: response.data.statewise[0].deaths,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errMsg: "Error retreiving data" });
      });
  }

  render() {
    const { active, recovered, deaths, errMsg } = this.state;
    // const array = [""];
    // for (let i = 0; i < 1; i++) {
    //   array[i] = posts[i];
    // }

    const total = [
      {
        region: "Active",
        val: active,
      },
      {
        region: "Recovered",
        val: recovered,
      },
      {
        region: "Deaths",
        val: deaths,
      },
    ];
    return (
      <PieChart
        id="pie"
        type="doughnut"
        title=""
        palette="Material"
        dataSource={total}
      >
        {/* <h1>{console.log("total:", total)}</h1> */}
        <Series argumentField="region">
          <Label visible={true} format="thousands">
            <Connector visible={true} />
          </Label>
        </Series>

        <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>
          <Format type="thousands" />
        </Tooltip>
      </PieChart>
    );
  }

  customizeTooltip(arg) {
    return {
      text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
    };
  }
}

export default Donut;
