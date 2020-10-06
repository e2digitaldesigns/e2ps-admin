import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { PageTemplateHeader } from "../../../../template/template-main-content/template-main-content-assets";
import ProductManagementProfileInformation from "./product-management-profile-information";
import {
  deleteProduct,
  fetchProductById,
} from "../../../../../redux/actions/products/productActions";

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.products.product);
  const [state, setState] = useState({ dataLoaded: false });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await dispatch(fetchProductById(props.match.params.id));
        if (data.error.errorCode === "0x0") {
          setState({ dataLoaded: true, _id: data.product._id });
        }
      } catch (err) {
        console.log(21, "cat pro", err);
      }
    }

    fetchData();
  }, [props.match.params.id, dispatch]);

  if (!state.dataLoaded) {
    return (
      <>
        <div />
      </>
    );
  }

  const handeDeleteProduct = async () => {
    try {
      const result = await dispatch(deleteProduct(state._id));
      if (result.error.errorCode === "0x0") {
        history.push("/console/product-management/products/listing/");
      }
    } catch (error) {
      console.log(49, error);
    }
  };

  return (
    <>
      <PageTemplateHeader
        displayName={"Product Management"}
        button={{
          text: "New Product",
          url: "/console/product-management/products/new",
        }}
      />

      <Card className="main-content-card">
        <Card.Title>
          <span className="pull-left">{product.name}</span>
          <Button
            className="pull-right"
            size="sm"
            variant="danger"
            onClick={() => handeDeleteProduct()}
          >
            Delete Product
          </Button>
        </Card.Title>

        <Card.Subtitle className="mb-1 text-muted">
          http://store.com/print/{product.url}
        </Card.Subtitle>
      </Card>

      <ProductManagementProfileInformation />
    </>
  );
};
