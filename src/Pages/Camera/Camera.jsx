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
  const [uploadProgress, setUploadProgress] = useState(0);

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
    setTimeout(handleStopCaptureClick, 5000);
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
        url: "https://44.219.93.142.nip.io/processVideo",
        data: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      setTimeout(() => {
        setShowCamera(false);
        setShowQr(data.url);
      }, 2000);
    } catch (error) {}
  };

  return (
    <div>
      <div className="cameraframe">
        <img src={camframe} alt="Camera Frame" width={1024} height={1292} />
        <div className="camera">
          {capturing ? (
            <Webcam
              ref={webcamRef}
              className="react-webcam"
              videoConstraints={{
                facingMode: "user",
                aspectRatio: 0.79,
              }}
              width={1024}
              height={1292}
              onUserMedia={() => setTimeout(handleStartCaptureClick, 1000)}
            />
          ) : (
            <div className="loader">
              {(uploadProgress < 100) ? (
                <>
                <div style={{ fontSize: 60 }}>
                  {uploadProgress}%
                </div>
                <div style={{ fontSize: 30 }}>Uploading</div>
              </>
              ) : (
                <div style={{ fontSize: 30 }}>Processing Video..</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
