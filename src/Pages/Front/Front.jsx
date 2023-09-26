import React, { useEffect, useState } from "react";
import gmlogo from "../../assets/gmlogo.png";
import give from "../../assets/give.png";
import heart from "../../assets/heart.png";
import nkh from "../../assets/nkh.png";
import smileto from "../../assets/smileto.png";
import smile from "../../assets/smile.png";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import scanhere from "../../assets/scanhere.png";
import QRCode from "react-qr-code";
import "./Front.css"; // Import the CSS file

export default function Front({
  setShowCamera,
  setShowFront,
  showQr,
  setShowQr
}) {
  const [count, setCount] = useState(3);
  const [startCountdown, setStartCountdown] = useState(false);

  const handleStartCountdown = () => setStartCountdown(true);

  useEffect(() => {
    if (startCountdown) {
      const countdownInterval = setInterval(() => {
        if (count > 1) {
          setCount(count - 1);
        } else {
          setShowFront(false);
          setShowCamera(true);
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  }, [startCountdown, count]);

  const goHome = () => {
    setShowQr(false);
    setShowFront(true);
  }

  useEffect(() => {
    if (showQr) {
      setTimeout(goHome, 5000);
    }
  }, [showQr])

  const countImageMap = {
    1: one,
    2: two,
    3: three,
  };

  return (
    <div className="front">
      <div className="front-top">
        <div className="gmlogo" onClick={goHome}>
          <img src={gmlogo} />
        </div>
        <div className="give">
          <img 
            src={showQr ? scanhere : startCountdown ? smile : give}
            style={{
              height: showQr ? 160 : 250,
              marginBottom: showQr ? 90 : 0
            }}
          />
        </div>
      </div>
      <div className="front-center">
        <img src={heart} className="heart-img" onClick={handleStartCountdown} />
        {!startCountdown ? (
          showQr ? (
            <div className="qrarea">
              <QRCode value={showQr} />
            </div>
          ) : (
            <img src={smileto} className="smile-to" onClick={handleStartCountdown} />
          )
        ) : (
          <img src={countImageMap[count]} className="count-img" />
        )}
        <img src={nkh} className="nkh-front" onClick={handleStartCountdown} />
      </div>
    </div>
  );
}