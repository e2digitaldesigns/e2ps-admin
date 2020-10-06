import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";

const onSelectPill = (e) => {
  console.log(e);
};

export default () => {
  return (
    <>
      <Card className="main-content-card" style={{ paddingLeft: "1.25rem" }}>
        <Nav
          variant="pills"
          onSelect={(e) => onSelectPill(e)}
          defaultActiveKey="contact"
        >
          <Nav.Item>
            <Nav.Link eventKey="contact">Contact</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Shipping Profiles</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled">Payments</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card>

      <ButtonGroup
        size="sm"
        aria-label="Basic example"
        style={{ paddingLeft: ".625rem", paddingTop: ".625rem" }}
      >
        <Button variant="primary">Contact</Button>
        <Button variant="outline-primary">Shipping Profiles</Button>
        <Button variant="outline-primary">Payments</Button>
      </ButtonGroup>
    </>
  );
};
