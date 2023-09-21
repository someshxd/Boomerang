import React, { useEffect, useState } from "react";
import gmlogo from "../../assets/gmlogo.png";
import smile from "../../assets/smile.png";
import heart from "../../assets/heart.png";
import nkh from "../../assets/nkh.png";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import "./Countdown.css";

export default function Countdown({
  setShowCamera,
  setShowFront,
  setShowCountdown,
}) {
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThree(false);
      setShowTwo(true);

      setTimeout(() => {
        setShowTwo(false);
        setShowOne(true);
        setTimeout(() => {
          setShowFront(false);
          setShowCamera(true);
          setShowCountdown(false);
        }, 1000);
      }, 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="app">
        <div className="gmlogo">
          <img src={gmlogo} />
        </div>
        <div className="smile">
          <img src={smile} />
        </div>
        <div className="heart">
          <img src={heart} />
        </div>
        <div className="nkh">
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
