import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Camera.css";
import gmlogo from "../../assets/gmlogo.png";
import frame from "../../assets/frame.png";
import bigg from "../../assets/bigg.png";
import camframe from "../../assets/camframe.png";
import Webcam from "react-webcam";
import axios from "axios";
import { CloudinaryVideo } from "@cloudinary/url-gen";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { image } from "@cloudinary/url-gen/qualifiers/source";

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
    console.log("recordedChunks", recordedChunks);
    const file = new Blob(recordedChunks, {
      type: "video/webm",
    });

    console.log("file", file);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "q1gh8rnp");

    try {
      const { data } = await axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/daxr7lj1c/video/upload",
        data: formData,
        onUploadProgress: (event) => setUploadProgress(event.loaded),
      });
      const url = data.url.replace(
        "upload/",
        "upload/f_gif/e_boomerang/e_loop/"
      );
      console.log("data", data);

      const cloudinaryVideo = new CloudinaryVideo(
        data.asset_id + "." + data.format
      )
        .setCloudConfig({
          cloudName: "daxr7lj1c",
        })
        .overlay(source(image("overlay_img")));

      console.log("cloudinaryVideo", cloudinaryVideo);
      const finalUrl = cloudinaryVideo.toURL();
      console.log("finalUrl", finalUrl);
      setShowCamera(false);
      setShowQr(url);
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
              }}
              width={2600}
              height={2500}
            />
          ) : (
            <div>Uploading... {uploadProgress}</div>
          )}
        </div>
      </div>
    </div>
  );
}
