import React, { useEffect, useRef, useState } from "react";
import "./Camera.css";
import camframe from "../../assets/camframe.png";
import Webcam from "react-webcam";
import axios from "axios";
import loader from "../../assets/loader.gif";

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
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
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
    setTimeout(() => {
      handleStartCaptureClick();
    }, 1000);
  }, []);

  useEffect(() => {
    if (!capturing) uploadVideo();
  }, [capturing]);

  const uploadVideo = async () => {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    const file = new File([blob], `${Date.now()}-recordedfile`);

    const formData = new FormData();

    formData.append("video", file);

    try {
      const { data } = await axios({
        method: "post",
        url: "https://44.219.93.142/processVideo",
        data: formData,
      });
      const url = data.url.replace(
        "upload/",
        "upload/f_gif/e_boomerang/e_loop/"
      );

      setShowCamera(false);
      setShowQr(data.url);
    } catch (error) {}
  };

  // Camera.js

  // Camera.js

  return (
    <div>
      <div className="cameraframe">
        <img src={camframe} alt="Camera Frame" />
        <div className="camera">
          {capturing ? (
            <Webcam
              ref={webcamRef}
              className="react-webcam"
              videoConstraints={{
                facingMode: "user",
                aspectRatio: 0.7496,
              }}
              width={2048}
              height={2732}
            />
          ) : (
            <div style={{ marginLeft: "47vw", marginTop: "40vh" }}>
              <img src={loader} alt="loader" width={150} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
