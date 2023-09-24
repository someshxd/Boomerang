import React, { useEffect, useState } from "react";
import Front from "./Pages/Front/Front";
import Camera from "./Pages/Camera/Camera";

export default function App() {
  const [showFront, setShowFront] = useState(true);
  const [showcamera, setShowCamera] = useState(false);
  const [showQr, setShowQr] = useState(false);

  return (
    <div className="app">
      {(showFront || showQr) && (
        <Front
          setShowCamera={setShowCamera}
          setShowFront={setShowFront}
          showQr={showQr}
          setShowQr={setShowQr} />
      )}
      {showcamera && (
        <Camera setShowQr={setShowQr} setShowCamera={setShowCamera} />
      )}
    </div>
  );
}
