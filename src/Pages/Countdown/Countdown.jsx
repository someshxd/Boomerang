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
  const [count, setCount] = useState(3);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (count > 1) {
        setCount(count - 1);
      } else {
        setShowFront(false);
        setShowCamera(true);
        setShowCountdown(false);
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [count]);

  const countImageMap = {
    1: one,
    2: two,
    3: three,
  };

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
        <div className="count">{<img src={countImageMap[count]} />}</div>
      </div>
    </div>
  );
}
