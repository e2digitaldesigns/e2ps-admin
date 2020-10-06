import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { orderImageDelete } from './../../../../../../../redux/actions/invoices/invoiceActions';

export default ({ orderId, side }) => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.invoice);

  const [progressState, setProgressState] = useState(0);
  const initialImageState = {
    _id: null,
    file: '_default-thumb.jpg',
    thumb: '_default-thumb.jpg',
  };

  const [imageState, setImageState] = useState({ ...initialImageState });

  const order = invoice.storeInvoiceItems.find((f) => f._id === orderId);

  useEffect(() => {
    let stillHere = true;

    const theImageIndex = order.item.images.findIndex(
      (f) => String(f.side) === String(side),
    );

    let newState =
      theImageIndex > -1
        ? order.item.images[theImageIndex]
        : {
            _id: null,
            file: '_default-thumb.jpg',
            thumb: '_default-thumb.jpg',
          };

    if (stillHere === true) {
      setImageState((imageState) => ({
        ...imageState,
        ...newState,
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [order, side]);

  const handleFileUploads = async (acceptedFiles) => {
    dispatch({ type: 'ORDER_INVOICE_IMAGE_UPLOAD_PENDING' });

    var formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append(
      'imageType',
      order.itemType === 'design' ? 'designFiles' : 'printFiles',
    );
    formData.append('side', side);
    formData.append('orderId', orderId);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.REACT_APP_REST_API + 'fileUpload');

    xhr.upload.addEventListener('progress', (e) => {
      const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
      setProgressState(percent);
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.response);
        setProgressState(0);

        if (data.error.errorCode === '0x0') {
          const payload = { orderId, images: data.dataSet.item.images };
          console.log(36, payload);
          dispatch({ type: 'ORDER_INVOICE_IMAGE_UPLOAD_SUCCESS', payload });
        } else {
          dispatch({ type: 'ORDER_INVOICE_IMAGE_UPLOAD_FAILURE' });
        }
      }
    };

    xhr.send(formData);
  };

  const handleOrderImageDownload = async () => {
    if (!imageState._id) return;

    try {
      axios({
        // url: 'https://source.unsplash.com/random/500x500',
        url: `${process.env.REACT_APP_CLOUD}${imageState.file}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${order.orderId}-side-${side}-${imageState.file}`,
        );
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {}
  };

  const handleOrderImageDelete = async (e) => {
    e.preventDefault();

    if (imageState._id) {
      await dispatch(orderImageDelete({ orderId, imageId: imageState._id }));
    }
  };

  return (
    <div className="order-image-wrapper">
      <div className="image-wrapper">
        <img
          src={`${process.env.REACT_APP_CLOUD}${imageState.thumb}`}
          alt="xxx"
        />
        <div className="progress-bar">
          <div
            className="progress-bar-inner"
            style={{ width: progressState + '%' }}
          ></div>
        </div>
        <div className="options-wrapper">
          <span
            className="material-icons cursor"
            onClick={(e) => handleOrderImageDownload(e)}
          >
            cloud_download
          </span>
          {/* <span className="material-icons">check_circle</span> */}

          {order.itemType !== 'design' && (
            <span
              className="material-icons cursor"
              onClick={(e) => handleOrderImageDelete(e)}
            >
              remove_circle
            </span>
          )}
        </div>
      </div>

      <div className="drop-zone-wrapper">
        <Dropzone
          onDrop={(acceptedFiles) => handleFileUploads(acceptedFiles)}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="drop-zone-pad" {...getRootProps()}>
              <input {...getInputProps()} />

              <div className="drop-zone-text">Browse</div>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};
