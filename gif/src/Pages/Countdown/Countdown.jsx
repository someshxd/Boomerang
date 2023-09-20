import React, { useEffect, useState } from "react";
import gmlogo from "../../assets/gmlogo.png";
import smile from "../../assets/smile.png";
import heart from "../../assets/heart.png";
import nkh from "../../assets/nkh.png";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import "./Countdown.css";

export default function Countdown() {
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowThree(false);
      setShowTwo(true);
      setInterval(() => {
        setShowTwo(false);
        setShowOne(true);
      }, 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="app">
        <div className="gmlogo2">
          <img src={gmlogo} />
        </div>
        <div className="smile">
          <img src={smile} />
        </div>
        <div className="heart2">
          <img src={heart} />
        </div>
        <div className="nkh2">
          <img src={nkh} />
        </div>
        <div className="count">
          {showOne && <img src={one} />}
          {showTwo && <img src={two} />}
          {showThree && <img src={three} />}
        </div>
      </div>
    </div>
  );
}