import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import PaginationUI, { Paginate, SearchFilter } from '../../../../utils/forms';
import { getInvoices } from './../../../../redux/actions/invoices/invoiceActions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// _compCart
// _estimate
// _quoteRequest
// _shoppingCart

export default (props) => {
  const searchTermRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const stores = useSelector((state) => state.system.storeFronts);
  const { listing, paginate } = useSelector((state) => state.invoice);

  const getState = useCallback(() => {
    return state;
  }, [state]);

  const [state, setState] = useState({
    type: query.get('type') ? query.get('type') : '_compCart',
    currentPage: query.get('page') ? parseInt(query.get('page')) : 1,
    pageSize: query.get('results') ? parseInt(query.get('results')) : 10,
    domain: query.get('d') ? query.get('d') : '',
    filter: query.get('st') ? query.get('st') : '',
  });

  console.log(38, state);

  // useEffect(() => {
  //   console.log(33, 'frrr');
  //   async function fetchData() {
  //     console.clear();
  //     console.log(43, state);
  //     let stating = await getState();
  //     try {
  //       await dispatch(getInvoices(stating));
  //     } catch (error) {
  //       console.log(41, 'invoice listing', error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const storeFronts = {};
  for (let i = 0; i < stores.length; i++) {
    storeFronts[stores[i]._id] = stores[i].name;
  }

  const handlePageSizeChange = (pageSize) => {
    setState({ ...state, currentPage: 1, pageSize });
  };

  const handleDomainChange = (e, id) => {
    e.preventDefault();
    setState({ ...state, currentPage: 1, domain: id });
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setState({ ...state, filter: e.target.value });
  };

  const handlePageChange = async (page) => {
    setState({ ...state, currentPage: page });

    try {
      const searchObj = {
        ...state,
        filter: searchTermRef.current,
        currentPage: page,
      };
      await dispatch(getInvoices(searchObj));
    } catch (error) {
      console.log(41, 'invoice listing', error);
    }
  };

  const handleSubmit = async () => {
    try {
      searchTermRef.current = state.filter;
      const searchObj = {
        ...state,
        filter: searchTermRef.current,
        currentPage: 1,
      };
      await dispatch(getInvoices(searchObj));
    } catch (error) {
      console.log(41, 'invoice listing', error);
    }
  };

  return (
    <>
      <PageTemplateHeader
        displayName="Order Management"
        button={{
          text: 'New Order',
          url: '/console/order-management/new',
        }}
      />

      <div className="listingTable-filter-holder">
        <SearchFilter
          pageSize={state.pageSize}
          filter={state.filter}
          domainId={state.domain}
          handleDomainChange={handleDomainChange}
          handleFilterChange={handleFilterChange}
          handlePageSizeChange={handlePageSizeChange}
          storeFilter={false}
          submitButton={true}
          handleSubmit={handleSubmit}
        />
      </div>

      <Card className="main-content-card">
        <Table striped hover size="sm" className="listingTable">
          <thead>
            <tr>
              <th>Company {state.currentPage} </th>
              <th className="hidden-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {listing.map((m) => (
              <tr key={m._id} className="listingTable-tr">
                <td>
                  {m.invoice[0].invoiceId} - {m.orderId}
                  <br />
                  Job Name: {m.item.name}
                  <br />
                  <Link
                    to={`/console/order-management/invoice/${m.invoice[0]._id}`}
                  >
                    View
                  </Link>
                </td>
                <td className="hidden-sm">{m.date.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <div className="listingTable-paginate-holder">
        <PaginationUI
          itemsCount={paginate.totalResults}
          currentPage={paginate.currentPage}
          pageSize={state.pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
