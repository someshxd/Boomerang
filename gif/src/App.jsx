import React, { useEffect, useState } from "react";
import Front from "./Pages/Front/Front";
import Countdown from "./Pages/Countdown/Countdown";
import Camera from "./Pages/Camera/Camera";
import Qrscan from "./Pages/Qrscan/Qrscan";
import UploadWidget from "./UploadWidget";

export default function App() {
  const [showFront, setShowFront] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showcamera, setShowCamera] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // useEffect(() => {
  //   if (setShowCountdown(true)) {
  //     setTimeout(() => {
  //       setShowCamera(true);
  //     }, 3000);
  //   }
  // }, []);

  return (
    <div className="app">
      {showFront && <Front setShowCountdown={setShowCountdown} />}
      {showCountdown && (
        <Countdown
          setShowCamera={setShowCamera}
          setShowFront={setShowFront}
          setShowCountdown={setShowCountdown}
        />
      )}
      {showcamera && <Camera />}
      {showQr && <Qrscan />}
      <UploadWidget />
    </div>
  );
}
