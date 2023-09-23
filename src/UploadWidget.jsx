import { useEffect, useRef } from "react";
const UploadWidget = () => {
  const cloudunaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudunaryRef.current = window.cloudinary;
    widgetRef.current = cloudunaryRef.current.createUploadWidget(
      {
        cloudName: "daxr7lj1c",
        uploadPreset: "q1gh8rnp",
      },
      function (error, result) {
        console.log(result);
      }
    );
  }, []);
  return <button onClick={() => widgetRef.current.open()}>Upload</button>;
};
export default UploadWidget;
