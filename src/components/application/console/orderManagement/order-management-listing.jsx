import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import PaginationUI, { SearchFilter } from '../../../../utils/forms';
import { getInvoices } from './../../../../redux/actions/invoices/invoiceActions';

import LoadingPage from '../_utils/_loading/loading';
import { dateParser } from '../_utils';

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchTermRef = useRef();
  const initState = useRef();
  const stores = useSelector((state) => state.system.storeFronts);
  const { listing, paginate } = useSelector((state) => state.invoice);

  const [documentState, setDocumentState] = useState({
    docReady: false,
  });

  const params = new URLSearchParams(useLocation().search);
  const type = params.get('type');

  initState.current = {
    type: params.get('type'),
    currentPage:
      params.has('page') && params.get('page') !== ''
        ? parseInt(params.get('page'))
        : 1,
    pageSize:
      params.has('results') && params.get('results') !== ''
        ? parseInt(params.get('results'))
        : 10,
    domain: params.has('d') ? params.get('d') : '',
    filter: params.has('st') ? params.get('st') : '',
  };

  const [state, setState] = useState({
    ...initState.current,
  });

  useEffect(() => {
    console.clear();
    let stillHere = true;

    async function fetchData() {
      try {
        const result = await dispatch(getInvoices({ ...initState.current }));

        if (result.error.errorCode === '0x0' && stillHere) {
          setDocumentState((documentState) => ({
            ...documentState,
            docReady: true,
          }));
        } else {
          throw result;
        }
      } catch (error) {
        console.log(68, 'invoice listing', error);
      }
    }

    fetchData();

    return () => {
      stillHere = false;
    };
  }, [dispatch, initState, type]);

  const storeFronts = {};
  for (let i = 0; i < stores.length; i++) {
    storeFronts[stores[i]._id] = stores[i].name;
  }

  const handlePageSizeChange = (pageSize) => {
    setState({ ...state, pageSize });
  };

  const handleDomainChange = (e, id) => {
    e.preventDefault();
    setState({ ...state, domain: id });
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setState({ ...state, filter: e.target.value });
  };

  const handlePageChange = async (page) => {
    setState({ ...state, currentPage: page });

    try {
      let thePageSize = '',
        theDomain = '',
        theFilter = '';

      if (searchTermRef.current) {
        thePageSize = searchTermRef.current.pageSize;
        theDomain = searchTermRef.current.domain;
        theFilter = searchTermRef.current.filter;
      }

      const searchObj = {
        ...state,
        filter: theFilter,
        currentPage: page,
      };

      await dispatch(getInvoices(searchObj));

      const theLinker = `/console/order-management/listing/?type=${type}&page=${page}&results=${thePageSize}&domain=${theDomain}&filter=${theFilter}`;

      history.push(theLinker);
    } catch (error) {
      console.error(119, 'invoice listing', error);
    }
  };

  const handleSubmit = async () => {
    try {
      searchTermRef.current = {
        pageSize: state.pageSize,
        domain: state.domain,
        filter: state.filter,
      };

      const searchObj = {
        ...state,
        ...searchTermRef.current,
        currentPage: 1,
      };

      await dispatch(getInvoices(searchObj));

      const theLinker = `/console/order-management/listing/?type=${type}&page=1&results=${searchObj.pageSize}&domain=${searchObj.domain}&filter=${searchObj.filter}`;

      history.push(theLinker);
    } catch (error) {
      console.error(143, 'invoice listing', error);
    }
  };

  if (!documentState.docReady) return <LoadingPage />;

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
              <th>Company </th>
              <th className="hidden-sm"></th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {listing.map((m) => (
              <tr key={m._id} className="listingTable-tr">
                <td>
                  {m.invoice[0].invoiceId} - {m.orderId}
                  <br />
                  <strong>{m.customer[0].contact.companyName}</strong> <hr />
                  {m.theItem.displayName}
                  <br />
                  Item Type: {m.itemType} <br />
                  Job Name: {m.item.name}
                  <br />
                  <Link
                    to={`/console/order-management/invoice/${m.invoice[0]._id}`}
                  >
                    View Order
                  </Link>
                </td>
                <td className="hidden-sm">{dateParser(m.orderDate, 'sm')}</td>
                <td>
                  <div className="order-list-img-holder">
                    {m.item.images.map((imgMap, imgIndex) => (
                      <div key={imgIndex} className="order-list-img">
                        <img
                          src={`${process.env.REACT_APP_CLOUD}${imgMap.thumb}`}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <div className="listingTable-paginate-holder">
        <PaginationUI
          itemsCount={paginate.totalResults}
          currentPage={paginate.currentPage}
          pageSize={
            searchTermRef.current
              ? searchTermRef.current.pageSize
              : initState.current.pageSize
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
