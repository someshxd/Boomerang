import React from "react";
import "./Camera.css";
import gmlogo from "../../assets/gmlogo.png";
import frame from "../../assets/frame.png";
import bigg from "../../assets/bigg.png";
import Webcam from "react-webcam";

export default function Camera() {
  return (
    <div>
      <div className="camera">
        <div className="frame">
          <img src={frame} />
        </div>
        <div className="gmlogo">
          <img src={gmlogo} />
        </div>
        <div className="bigg">
          <img src={bigg} />
        </div>
      </div>
    </div>
  );
}
