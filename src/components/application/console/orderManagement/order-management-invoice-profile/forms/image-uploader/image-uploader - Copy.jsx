import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "dropzone";

export default () => {
  const imageLink =
    "https://e2ps-customer-files.s3.amazonaws.com/print-uploads/low-res/1562972730_side_01_thumb_e121cde411cc79149298f872aed9cc39.jpg";
  return (
    <>
      <div id="myId"></div>
      <div className="invoice-image-holder">
        <div className="invoice-image">
          <img alt="ddd" src={imageLink} />
        </div>

        <div className="invoice-image">
          {/* <img alt="ddd" src={imageLink} /> */}
          <MyDropzone />
        </div>
      </div>{" "}
    </>
  );
};

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(26, acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{ backgroundColor: "#ccc", width: "100%", height: "100%" }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

//https://www.dropzonejs.com/bootstrap.html#
