import React from 'react';

// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import ProductImageUploader from './product-management-profile-images-uploader';

export default () => {
  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span>Images</span>
        </Card.Title>

        <div className="product-image-grid">
          <ProductImageUploader imageType="product-image-homepage" />
          <ProductImageUploader imageType="product-image-homepage-featured" />
          <ProductImageUploader imageType="product-image-profile-print" />
          <ProductImageUploader imageType="product-image-profile-design" />
        </div>
      </Card>
    </>
  );
};
