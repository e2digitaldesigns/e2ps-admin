import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageTemplateHeader } from "../../../../template/template-main-content/template-main-content-assets";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import PaginationUI, {
  Paginate,
  SearchFilter,
} from "../../../../../utils/forms";

import { getAttributes } from "../../../../../redux/actions/products/attributesActions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const stores = useSelector((state) => state.system.storeFronts);
  const products = useSelector((state) => state.attributes.listing);

  const [state, setState] = useState({
    currentPage: query.get("page") ? parseInt(query.get("page")) : 1,
    pageSize: query.get("results") ? parseInt(query.get("results")) : 10,
    domain: query.get("d") ? query.get("d") : "",
    filter: query.get("st") ? query.get("st") : "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getAttributes());
      } catch (error) {
        console.log(41, "attribute listing", error);
      }
    }

    fetchData();
  }, [props.match.params.id, dispatch]);

  const storeFronts = {};
  for (let i = 0; i < stores.length; i++) {
    storeFronts[stores[i]._id] = stores[i].name;
  }

  const handlePageSizeChange = (pageSize) => {
    setState({ ...state, currentPage: 1, pageSize });
    linkParser(1, pageSize, state.domain, state.filter);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setState({ ...state, currentPage: 1, filter: e.target.value });
    linkParser(1, state.pageSize, state.domain, e.target.value);
  };

  const handlePageChange = (page) => {
    setState({ ...state, currentPage: page });
    linkParser(page, state.pageSize, state.domain, state.filter);
  };

  const linkParser = (page, pageSize, domain, filter) => {
    console.clear();
    const linker = `/console/product-management/attribute/listing/?page=${page}&results=${pageSize}&d=${domain}&st=${filter}`;
    history.push(linker);
  };

  let { currentPage, pageSize, domain, filter } = state;
  filter = filter.toLowerCase();

  let filtered = filter
    ? products.filter((f) => f.name.toLowerCase().includes(filter))
    : products;

  filtered = domain
    ? filtered.filter((f) => f.storeFrontId === domain)
    : filtered;

  const count = filtered.length;
  const listing = Paginate(filtered, currentPage, pageSize);

  return (
    <>
      <PageTemplateHeader
        displayName="Attribute Management"
        button={{
          text: "New Attribute",
          url: "/console/product-management/attribute/new",
        }}
      />

      <div className="listingTable-filter-holder">
        <SearchFilter
          pageSize={state.pageSize}
          filter={state.filter}
          domainId={state.domain}
          handleFilterChange={handleFilterChange}
          handlePageSizeChange={handlePageSizeChange}
          storeFilter={false}
        />
      </div>

      <Card className="main-content-card">
        <Table striped hover size="sm" className="listingTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Display Name</th>
            </tr>
          </thead>
          <tbody>
            {listing.map((m) => (
              <tr key={m._id} className="listingTable-tr">
                <td>
                  {m.name}
                  <br />
                  <Link
                    to={
                      "/console/product-management/attribute/profile/" + m._id
                    }
                  >
                    View
                  </Link>
                </td>
                <td>{m.displayName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <div className="listingTable-paginate-holder">
        <PaginationUI
          itemsCount={count}
          currentPage={state.currentPage}
          pageSize={state.pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
