import React from "react";
import "./Qrscan.css";
import gmlogo from "../../assets/gmlogo.png";
import scanhere from "../../assets/scanhere.png";
import qrarea from "../../assets/qrarea.png";
import heart from "../../assets/heart.png";
import nkh from "../../assets/nkh.png";
import QRCode from "react-qr-code";

export default function Qrscan({ showQr }) {
  return (
    <div>
      <div className="app">
        <div className="gmlogo">
          <img src={gmlogo} />
        </div>
        <div className="scanhere">
          <img src={scanhere} />
        </div>
        <div className="heart">
          <img src={heart} />
        </div>
        <div className="nkh2">
          <img src={nkh} />
        </div>
        <div className="qrarea">
          <QRCode value={showQr} />
        </div>
      </div>
    </div>
  );
}
