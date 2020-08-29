import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";

import LinearGradient from "./LinearGradient.js";
import "./StyleChoro.css";

/**
 * Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
 * Looking topojson for other countries/world?
 * Visit: https://github.com/markmarkoh/datamaps
 */
const INDIA_TOPO_JSON = require("./india.topo.json");

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#f5f9ff",
  "#e6f0ff",
  "#c7deff",
  "#99b9ff",
  "#7a8cff",
  "#4600d1",
  "#330099",
  "#25006e",
  "#130038",
];

const DEFAULT_COLOR = "#ffffff";

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ffffff",
    transition: "all 1000ms",
    outline: "#2d00cc",
  },
  pressed: {
    outline: "#5a008a",
  },
};

// will generate random heatmap data on every call
const getHeatMapData = () => {
  return [
    { id: "AP", state: "Andhra Pradesh", value: 92208 },
    { id: "AR", state: "Arunachal Pradesh", value: 987 },
    { id: "AS", state: "Assam", value: 19532 },
    { id: "BR", state: "Bihar", value: 19571 },
    { id: "CT", state: "Chhattisgarh", value: 10174 },
    { id: "GA", state: "Goa", value: 3351 },
    { id: "GJ", state: "Gujarat", value: 14786 },
    { id: "HR", state: "Haryana", value: 9758 },
    { id: "HP", state: "Himachal Pradesh", value: 1427 },
    { id: "JH", state: "Jharkhand", value: 10463 },
    { id: "KA", state: "Karnataka", value: 83608 },
    { id: "KL", state: "Kerala", value: 22344 },
    { id: "MP", state: "Madhya Pradesh", value: 12336 },
    { id: "MH", state: "Maharashtra", value: 172873 },
    { id: "MN", state: "Manipur", value: 1731 },
    { id: "ML", state: "Meghalaya", value: 1168 },
    { id: "MZ", state: "Mizoram", value: 494 },
    { id: "NL", state: "Nagaland", value: 1149 },
    { id: "OR", state: "Odisha", value: 24295 },
    { id: "PB", state: "Punjab", value: 14640 },
    { id: "RJ", state: "Rajasthan", value: 14099 },
    { id: "SK", state: "Sikkim", value: 407 },
    { id: "TN", state: "Tamil Nadu", value: 52362 },
    { id: "TG", state: "Telangana", value: 25685 },
    { id: "TR", state: "Tripura", value: 2863 },
    { id: "UT", state: "Uttarakhand", value: 4749 },
    { id: "UP", state: "Uttar Pradesh", value: 51325 },
    { id: "WB", state: "West Bengal", value: 26954 },
    { id: "AN", state: "Andaman and Nicobar Islands", value: 635 },
    { id: "CH", state: "Chandigarh", value: 1533 },
    { id: "DN", state: "Dadra and Nagar Haveli", value: 337 },
    { id: "DD", state: "Daman and Diu", value: 20 },
    { id: "DL", state: "Delhi", value: 12520 },
    { id: "JK", state: "Jammu and Kashmir", value: 7630 },
    { id: "LA", state: "Ladakh", value: 846 },
    { id: "LD", state: "Lakshadweep", value: 0 },
    { id: "PY", state: "Puducherry", value: 4264 },
  ];
};

function Choropleth() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [data, setData] = useState(getHeatMapData());

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0),
  };

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
  };

  return (
    <div className="full-width-height container">
      <h1 className="no-margin center">States and UTs</h1>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              //console.log(geo.id);
              const current = data.find((s) => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <LinearGradient data={gradientData} />
      <div className="center">
        <button className="mt16" onClick={onChangeButtonClick}>
          Change
        </button>
      </div>
    </div>
  );
}

export default Choropleth;
