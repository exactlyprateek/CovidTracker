import React, { Component } from "react";
import axios from "axios";

function GetData() {
  axios
    .get("https://api.covid19india.org/data.json")
    .then((response) => {
      console.log(response.data.statewise);
      this.setState({ posts: response.data.statewise[0] });
    })
    .catch((error) => {
      console.log(error);
      this.setState({ errMsg: "Error retreiving data" });
    });
  return this.response.data.statewise;
}
const { posts } = this.state;
export const populationByRegions = posts.statewise;
// export const populationByRegions = [
//   {
//     region: "Asia",
//     val: 4119626293,
//   },
//   {
//     region: "Africa",
//     val: 1012956064,
//   },
//   {
//     region: "Northern America",
//     val: 344124520,
//   },
//   {
//     region: "Latin America and the Caribbean",
//     val: 590946440,
//   },
//   {
//     region: "Europe",
//     val: 727082222,
//   },
//   {
//     region: "Oceania",
//     val: 35104756,
//   },
// ];
