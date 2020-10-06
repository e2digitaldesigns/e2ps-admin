import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";

export default ({
  state,
  handleNewSize,
  handleRemoveSize,
  handleSizeSelector,
}) => {
  const productSizes = state.product.productSizes;
  const tempSizes = state.temp.productSizes;
  return (
    <>
      <Card className="main-content-card">
        <Card.Title>
          <span className="pull-lef">
            Product Sizes ({productSizes.length})
          </span>
          <Button
            className="pull-right"
            size="sm"
            onClick={() => handleNewSize()}
          >
            Add New Size
          </Button>
        </Card.Title>

        <Table striped hover size="sm" className="listingTable">
          <thead>
            <tr>
              <th>Size</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Order</th>
              <th style={{ textAlign: "center" }}>Items</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productSizes.map((m, sizeIndex) => (
              <React.Fragment key={m._id}>
                <tr className="listingTable-tr">
                  <td>
                    <Button
                      variant="link"
                      onClick={() => handleSizeSelector(m._id)}
                    >
                      {tempSizes[sizeIndex].size}
                    </Button>
                  </td>
                  <td>
                    <span style={{ color: "green" }}>
                      {tempSizes[sizeIndex].isActive ? "Active" : "In-Active"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {tempSizes[sizeIndex].order}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {m.quantities ? tempSizes[sizeIndex].quantities.length : 0}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemoveSize(m._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};
