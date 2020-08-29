import React, { Component } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      error: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((response) => {
        console.log(response.data.statewise[0]);
        this.setState({ posts: response.data.statewise[0] });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errMsg: "Error retreiving data" });
      });
  }

  render() {
    const { posts, errMsg } = this.state;
    // var active = [1, 2],
    //   statenames = ["", ""];
    var total = { 1: "" };
    // var active = posts[0].active;
    for (let i = 0; i < 1; i++) {
      total = posts[i];
    }
    const state = {
      labels: ["active", "recovered", "deaths"],
      datasets: [
        {
          label: "Covid19India",
          fill: true,
          lineTension: 0.5,
          backgroundColor: [
            "rgba(0, 119, 204,1)",
            "rgba(28, 140, 0,1)",
            "rgba(201, 201, 201,1)",
          ],
          borderColor: "rgba(255,255,255,1)",
          borderWidth: 3,
          data: [posts.active, posts.recovered, posts.deaths],
        },
      ],
    };
    return (
      <div>
        List of Posts
        {posts.length
          ? posts.map((post) => <div key={post.statecode}>{post.state}</div>)
          : null}
        <Doughnut
          data={state}
          options={{
            title: {
              display: true,
              text: "Covid19 india",
              fontSize: 14,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
        {/* {states.length
          ? states.map((state) => (
              <div key={state.statecode}>
                {state.sta} : {state.title}
              </div>
            ))
          : null}
        {errMsg ? <div>{errMsg}</div> : null} */}
      </div>
    );
  }
}

export default PostList;
