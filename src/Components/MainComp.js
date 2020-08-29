import React, { Component } from "react";
import Choropleth from "./Choropleth";
import Donut from "./Donut";
import ChartLine from "./ChartLine";
import Box from "./Box";
import "./CovidStyle.css";
import "./css/sb-admin-2.min.css";
import axios from "axios";

class MainComp extends Component {
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
          total: response.data.statewise[0].confirmed,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errMsg: "Error retreiving data" });
      });
  }

  state = {};
  render() {
    const { active, recovered, deaths, total } = this.state;
    return (
      <div>
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                  <h1 className="h3 mb-0 text-gray-800">Covid</h1>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Visual
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row container">
                          <div className="col text-center">
                            <Donut />
                          </div>
                          <div className="col text-center">
                            <ChartLine />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <div className="card-body border30">
                        <div className="row">
                          <div className="col-xl-3 col-md-3 mb-2">
                            <div className="card shadow h-100 py-2 confirmed border10">
                              <div className="card-body">
                                <p>CONFIRMED</p>
                                <p>{total}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-3 mb-2">
                            <div className="card shadow h-100 py-2 active border10">
                              <div className="card-body">
                                <p>ACTIVE</p>
                                <p>{active}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-3 mb-2">
                            <div className="card shadow h-100 py-2 recovered border10">
                              <div className="card-body">
                                <p>RECOVERED</p>
                                <p>{recovered}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-3 mb-2">
                            <div className="card shadow h-100 py-2 deceased border10">
                              <div className="card-body">
                                <p>DECEASED</p>
                                <p>{deaths}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="india m-4 text-center">
                            <Choropleth />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainComp;
