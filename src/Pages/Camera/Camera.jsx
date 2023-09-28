import React, { useEffect, useRef, useState } from "react";
import "./Camera.css";
import camframe from "../../assets/camframe.png";
import Webcam from "react-webcam";
import axios from "axios";
import loader from "../../assets/loader.gif";

const getRecorderMimeType = () => {
  if (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)) {
    return "video/mp4";
  }

  return "video/webm";
}

export default function Camera({ setShowQr, setShowCamera }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(true);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStartCaptureClick = () => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: getRecorderMimeType(),
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    setTimeout(handleStopCaptureClick, 3000);
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  };

  useEffect(() => {
    if (!capturing && recordedChunks.length) uploadVideo(recordedChunks);
  }, [capturing, recordedChunks.length]);

  const uploadVideo = async (recordedChunks) => {
    const blob = new Blob(recordedChunks, {
      type: getRecorderMimeType(),
    });

    const file = new File([blob], `${Date.now()}-recordedfile`);

    const formData = new FormData();

    formData.append("video", file);

    try {
      const { data } = await axios({
        method: "post",
        url: "https://magenta-rose-bream-boot.cyclic.cloud/processVideo",
        data: formData,
      });

      setShowCamera(false);
      setShowQr(data.url);
    } catch (error) {}
  };

  return (
    <div>
      <div className="cameraframe">
        <img src={camframe} alt="Camera Frame" width={1024} height={1247} />
        <div className="camera">
          {capturing ? (
            <Webcam
              ref={webcamRef}
              className="react-webcam"
              videoConstraints={{
                facingMode: "user",
                aspectRatio: 0.8211,
              }}
              width={1024}
              height={1247}
              onUserMedia={handleStartCaptureClick}
            />
          ) : (
            <div className="loader">
              <img src={loader} alt="loader" width={80} style={{ marginLeft: 40 }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
