import React from 'react';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';

export default ({ orderId, images, side, showDropPad }) => {
  const dispatch = useDispatch();

  const handleFileUploads = async (acceptedFiles, side) => {
    console.clear();
    dispatch({ type: 'ORDER_INVOICE_IMAGE_UPLOAD_PENDING' });

    var formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('imageType', 'printFiles');
    formData.append('side', side);
    formData.append('orderId', orderId);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.REACT_APP_REST_API + 'fileUpload');

    xhr.upload.addEventListener('progress', (e) => {
      const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
      console.log(33, e.lengthComputable, e.loaded, e.total, percent);
      //update state
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.response);
        // console.log(28, JSON.parse(xhr.response));
        //update redux

        if (data.error.errorCode === '0x0') {
          const payload = { orderId, images: data.dataSet.item.images };
          // .find((f) => f.side === side);
          console.log(36, payload);
          dispatch({ type: 'ORDER_INVOICE_IMAGE_UPLOAD_SUCCESS', payload });
        } else {
          dispatch({ type: 'ORDER_INVOICE_IMAGE_UPLOAD_FAILURE' });
        }
      }
    };

    xhr.send(formData);
  };

  return (
    <div className="iih-grid-item invoice-image-uploader">
      <Dropzone
        onDrop={(acceptedFiles) => handleFileUploads(acceptedFiles, side)}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone-pad" {...getRootProps()}>
            <input {...getInputProps()} />

            <span className="text">
              Click Here
              <br /> - or - <br />
              Drag & Drop
            </span>
          </div>
        )}
      </Dropzone>
    </div>
  );
};
