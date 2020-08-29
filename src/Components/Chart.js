import React from "react";
import axios from "axios";

import SelectBox from "devextreme-react/select-box";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
} from "devextreme-react/chart";
import service from "./linedata.js";

const countriesInfo = service.getCountriesInfo();
const energySources = service.getEnergySources();
const types = ["line", "stackedline", "fullstackedline"];

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statewise: [],
      recovered: 0,
      deaths: 0,
      posts: [],
      type: "line",
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

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
    const { statewise, errMsg } = this.state;
    const states = [1];
    // console.log(
    //   states.map((one) => {
    //     const tstate = one.active;
    //   })
    // );
    console.log("tstate", states[0]);
    // const total = [];
    return (
      <React.Fragment>
        <Chart palette="Violet" dataSource={statewise}>
          <CommonSeriesSettings argumentField="val" type={this.state.type} />
          {statewise.map(function (item) {
            return (
              <Series
                key={item.statecode}
                valueField={item.confirmed}
                name={item.state}
              />
            );
          })}
          <Margin bottom={20} />
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
          >
            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Export enabled={true} />
          <Title text="">
            <Subtitle text="" />
          </Title>
          <Tooltip enabled={true} />
        </Chart>
        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <span>Series Type </span>
            <SelectBox
              dataSource={types}
              value={this.state.type}
              onValueChanged={this.handleChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleChange(e) {
    this.setState({ type: e.value });
  }
}

export default LineChart;
