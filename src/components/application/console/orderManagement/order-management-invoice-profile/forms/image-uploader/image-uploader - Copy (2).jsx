import React from 'react';
import E2psDropzone from './image-dropzone';

export default ({ assets, showDropPad }) => {
  // console.log("showDropPad", showDropPad);
  return (
    <>
      <div className="invoice-image-holder">
        {orderImageParser(assets.item.images, 1)}

        {orderImageParser(assets.item.images, 2)}
      </div>

      <div
        className={`invoice-dropzone-holders invoice-image-holder ${
          showDropPad && 'show-dropzone'
        } ${showDropPad === false && 'hide-dropzone'}`}
      >
        <E2psDropzone
          orderId={assets._id}
          images={assets.item.images}
          side={1}
          showDropPad={showDropPad}
        />

        <E2psDropzone
          orderId={assets._id}
          images={assets.item.images}
          side={2}
          showDropPad={showDropPad}
        />
      </div>
    </>
  );
};

const orderImageParser = (data, side) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] && i === parseFloat(side) - 1) {
      let image = data[i].thumb;

      if (image) {
        return (
          <div className="iih-grid-item order-image-div">
            <div className="inner-image-holder">
              <img
                className="order-image"
                alt={'order-image - ' + data._id}
                src={`${process.env.REACT_APP_CLOUD}${image}`}
              />
              <div className="order-image-bar">Down | Mar | Del</div>
            </div>
          </div>
        );
      }
    }
  }
};

// const orderImageParser = (data, side) => {
//   for (let i = 0; i < data.length; i++) {
//     if (data[i] && i === parseFloat(side) - 1) {
//       let image = data[i].thumb;

//       if (image) {
//         return (
//           <div className="iih-grid-item order-image-div">
//             <div className="inner-image-holder">
//               <img
//                 className="order-image"
//                 alt={'order-image - ' + data._id}
//                 src={`http://e2ps-react.s3.amazonaws.com/${image}`}
//               />
//               <div className="order-image-bar">Down | Mar | Del</div>
//             </div>
//           </div>
//         );
//       }
//     }
//   }
// };
