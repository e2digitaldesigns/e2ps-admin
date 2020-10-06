import React from 'react';
import LoadingSpin from 'react-loading-spin';

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingSpin
          duration="3s"
          width=".5rem"
          timingFunction="ease-in-out"
          direction="alternate"
          size="300px"
          primaryColor="#6a059d"
          secondaryColor="#ccc"
        />
      </div>
    </div>
  );
};
