import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

export default ({ group, handleGroupChange }) => {
  return (
    <>
      <Card className="main-content-card">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            className={group === 1 ? 'active' : ''}
            onClick={() => handleGroupChange(1)}
          >
            Sizes
          </Button>
          <Button
            variant="secondary"
            className={group === 2 ? 'active' : ''}
            onClick={() => handleGroupChange(2)}
          >
            Attributes
          </Button>

          <Button
            variant="secondary"
            className={group === 3 ? 'active' : ''}
            onClick={() => handleGroupChange(3)}
          >
            Images
          </Button>
        </ButtonGroup>
      </Card>
    </>
  );
};
