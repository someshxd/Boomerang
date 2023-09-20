import React from "react";
import gmlogo from "../../assets/gmlogo.png";
import give from "../../assets/give.png";
import heart from "../../assets/heart.png";
import nkh from "../../assets/nkh.png";
import smileto from "../../assets/smileto.png";
import "./Front.css"; // Import the CSS file

export default function Front() {
  return (
    <div className="app">
      <div className="gmlogo">
        <img src={gmlogo} alt="GM Logo" />
      </div>
      <div className="give">
        <img src={give} alt="Give" />
      </div>
      <div className="heart">
        <img src={heart} alt="Heart" />
      </div>
      <div className="nkh">
        <img src={nkh} alt="NKH" />
      </div>
      <div className="smileto">
        <img src={smileto} alt="Smile To" />
      </div>
    </div>
  );
}
