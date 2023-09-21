import React from "react";
import gmlogo from "../../assets/gmlogo.png";
import give from "../../assets/give.png";
import heart from "../../assets/heart.png";
import nkh from "../../assets/nkh.png";
import smileto from "../../assets/smileto.png";
import "./Front.css"; // Import the CSS file

export default function Front({ setShowCountdown }) {
  const showCount = () => {
    setShowCountdown(true);
  };
  return (
    <div className="app">
      <div className="gmlogo">
        <img src={gmlogo} />
      </div>
      <div className="give">
        <img src={give} />
      </div>
      <div className="heart">
        <img src={heart} onClick={showCount} />
      </div>
      <div className="nkh">
        <img src={nkh} />
      </div>
      <div className="smileto">
        <img src={smileto} />
      </div>
    </div>
  );
}
