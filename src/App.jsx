import React, { useEffect, useState } from "react";
import Front from "./Pages/Front/Front";
import Camera from "./Pages/Camera/Camera";

import gmlogo from "./assets/gmlogo.png";
import give from "./assets/give.png";
import heart from "./assets/heart.png";
import nkh from "./assets/nkh.png";
import smileto from "./assets/smileto.png";
import smile from "./assets/smile.png";
import one from "./assets/1.png";
import two from "./assets/2.png";
import three from "./assets/3.png";
import scanhere from "./assets/scanhere.png";
import camframe from "./assets/camframe.png";
import restart from "./assets/restart.png";

const imageSources = [
  gmlogo,
  give,
  heart,
  nkh,
  smileto,
  smile,
  one,
  two,
  three,
  scanhere,
  camframe,
  restart
]

export default function App() {
  const [showFront, setShowFront] = useState(true);
  const [showcamera, setShowCamera] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let imageCount = 0;

    const handleImageLoad = () => {
      imageCount++;
      if (imageCount === imageSources.length) {
        setLoading(false);
      }
    };

    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.addEventListener('load', handleImageLoad);
    });

    return () => {
      // Clean up event listeners
      imageSources.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.removeEventListener('load', handleImageLoad);
      });
    }
  }, [imageSources]);

  return (
    <div className="app">
      {loading ? (
        <div className="overlayContainer">
          <span class="overlayLoader"></span>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
