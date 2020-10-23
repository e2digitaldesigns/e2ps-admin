import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import PaginationUI, { SearchFilter } from '../../../../utils/forms';
import CustomerManagmentListingOptions from './customer-management-listing-options';
import { fetchCustomers } from '../../../../redux/actions/customers/customerListingActions';
import LoadingPage from '../_utils/_loading/loading';
import uniqid from 'uniqid';

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchTermRef = useRef();
  const stores = useSelector((state) => state.system.storeFronts);
  const { dataSet, paginate } = useSelector((state) => state.customerListing);

  const [documentState, setDocumentState] = useState({
    docReady: false,
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  let pageSize = query.get('results') ? parseInt(query.get('results')) : 10;

  const [state, setState] = useState({
    currentPage: query.get('page') ? parseInt(query.get('page')) : 1,
    pageSize: query.get('results') ? parseInt(query.get('results')) : 10,
    domain: query.get('d') ? query.get('d') : '',
    filter: query.get('st') ? query.get('st') : '',
  });

  useEffect(() => {
    let stillHere = true;

    async function fetchData() {
      let stating = {
        currentPage: 1,
        pageSize: 10,
        domain: '',
        filter: '',
      };
      try {
        const result = await dispatch(fetchCustomers(stating));

        if (result.error.errorCode === '0x0' && stillHere) {
          setDocumentState((documentState) => ({
            ...documentState,
            docReady: true,
          }));
        } else {
          throw result;
        }
      } catch (error) {
        console.log(41, 'invoice listing', error);
      }
    }

    fetchData();

    return () => {
      stillHere = false;
    };
  }, [dispatch, props.match.params.rand]);

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

      await dispatch(fetchCustomers(searchObj));

      const theLinker = `/console/customer-management/listing/${props.match.params.rand}/?page=${page}&results=${thePageSize}&domain=${theDomain}&filter=${theFilter}`;
      history.push(theLinker);
    } catch (error) {
      console.error(79, 'invoice listing', error);
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

      await dispatch(fetchCustomers(searchObj));

      const theLinker = `/console/customer-management/listing/${props.match.params.rand}/?page=1&results=${searchObj.pageSize}&domain=${searchObj.domain}&filter=${searchObj.filter}`;
      history.push(theLinker);
    } catch (error) {
      console.error(94, 'invoice listing', error);
    }
  };

  if (!documentState.docReady) return <LoadingPage />;

  return (
    <>
      <PageTemplateHeader
        displayName="Customer Management"
        button={{
          text: 'New Customer',
          url: `/console/customer-management/new/${uniqid()}`,
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
              <th>Customer </th>
              <th className="hidden-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {dataSet.map((m) => (
              <tr key={m._id} className="listingTable-tr">
                <td>
                  {m.contact.companyName && (
                    <>
                      <strong>{m.contact.companyName}</strong>
                    </>
                  )}
                  {/* <br /> Store: {storeFronts && storeFronts[m.storeFrontId]} */}
                  <br />
                  {m.contact.firstName} {m.contact.lastName}
                  <br />
                  {m.contact.email}
                  <br />
                  {m.contact.phone}
                  <br />
                  <CustomerManagmentListingOptions id={m._id} />
                </td>
                <td className="hidden-sm">
                  {m.isActive ? 'Active' : 'In-Active'}
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
            searchTermRef.current ? searchTermRef.current.pageSize : pageSize
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
