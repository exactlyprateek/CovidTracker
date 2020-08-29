import React from "react";
import "./Style.css";
function Box() {
  return (
    <div>
      <div className="flex-container">
        <div className="one each">
          <p>CONFIRMED</p>
          <p>235223</p>
        </div>
        <div className="two each">
          <p>ACTIVE</p>
          <p>235223</p>
        </div>
        <div className="three each">
          <p>RECOVERED</p>
          <p>235223</p>
        </div>
        <div className="four each">
          <p>DECEASED</p>
          <p>235223</p>
        </div>
      </div>
    </div>
  );
}

export default Box;
