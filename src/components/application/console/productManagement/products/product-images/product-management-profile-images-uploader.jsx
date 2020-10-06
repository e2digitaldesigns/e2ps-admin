import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Dropzone from 'react-dropzone';
import * as actions from '../../../../../../redux/actions/actionTypes';

export default ({ imageType }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const imaging = useSelector((state) => state.products.product.images);
  const [progressState, setProgressState] = useState(0);

  const [imageState, setImageState] = useState({
    _id: null,
    imageType: imageType,
    isActive: false,
    file: '',
    thumb: '_default-thumb.jpg',
  });

  useEffect(() => {
    let stillHere = true;

    const theImageIndex = imaging.findIndex((f) => f.imageType === imageType);

    if (theImageIndex > -1 && stillHere === true) {
      setImageState((imageState) => ({
        ...imageState,
        ...imaging[theImageIndex],
      }));
    }

    return () => {
      stillHere = false;
    };
  }, [imaging, imageType]);

  const handleFormChange = () => {
    console.clear();
    console.log(38, imageState);
  };

  const handleFileUploads = async (acceptedFiles) => {
    console.clear();
    dispatch({ type: actions.PRODUCT_IMAGE_UPLOAD_PENDING });

    var formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('productId', product._id);
    formData.append('imageType', 'storeFrontFiles');
    formData.append('subImageType', imageType);
    formData.append('imageId', imageState._id);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.REACT_APP_REST_API + 'fileUpload');

    xhr.upload.addEventListener('progress', (e) => {
      const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
      console.log(33, e.lengthComputable, e.loaded, e.total, percent);
      setProgressState(percent);
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.response);
        setProgressState(0);

        if (data.error.errorCode === '0x0') {
          console.log(68, data.dataSet);
          const payload = {
            images: data.dataSet.images,
          };
          console.log(36, payload);
          dispatch({ type: actions.PRODUCT_IMAGE_UPLOAD_SUCCESS, payload });
        } else {
          console.log(32, 'all bad');
          dispatch({ type: actions.PRODUCT_IMAGE_UPLOAD_FAILURE });
        }
      }
    };

    xhr.send(formData);
  };

  let imageInfoObj = {};

  switch (imageType) {
    default:
    case 'product-image-homepage':
      imageInfoObj.title = 'Home Page Image';
      break;

    case 'product-image-homepage-featured':
      imageInfoObj.title = 'Home Page Featured';
      break;

    case 'product-image-profile-print':
      imageInfoObj.title = 'Profile Page Image Print';
      break;

    case 'product-image-profile-design':
      imageInfoObj.title = 'Profile Page Image Design';
      break;
  }

  return (
    <div className="product-image-wrapper">
      <div className="title">{imageInfoObj.title}</div>

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
      </div>

      <div className="product-image-status-wrapper">
        <Form.Check
          id={'_attr_isActive'}
          name={'isActive'}
          type="switch"
          label={'IsActive'}
          onChange={(e) => handleFormChange(e)}
        />
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
