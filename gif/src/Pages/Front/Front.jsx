import React from "react";
import gmlogo from "../../assets/gmlogo.png";
import give from "../../assets/give.png";
import heart from "../../assets/heart.png";
import nkh from "../../assets/nkh.png";
import smileto from "../../assets/smileto.png";
import "./Front.css";
import scanqr from "../../assets/scanqr.jpg";

export default function Front() {
  return (
    <div>
      <div className="app">
        <div className="gmlogo">
          <img src={gmlogo} />
        </div>
        <div className="give">
          <img src={give} />
        </div>
        <div className="heart">
          <img src={heart} />
        </div>
        <div className="nkh">
          <img src={nkh} />
        </div>
        <div className="smileto">
          <img src={smileto} />
        </div>
      </div>
    </div>
  );
}
