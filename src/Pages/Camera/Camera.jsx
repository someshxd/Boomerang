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
    console.log('capturing')
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm;codecs=h264",
    });
    console.log("capturing 2")
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
        url: "https://e286-117-215-254-70.ngrok-free.app/processVideo",
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
