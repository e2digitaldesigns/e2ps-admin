import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import PaginationUI, { Paginate, SearchFilter } from '../../../../utils/forms';
import CustomerManagmentListingOptions from './customer-management-listing-options';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const history = useHistory();
  const query = useQuery();
  const stores = useSelector((state) => state.system.storeFronts);
  const customers = useSelector((state) => state.customerListing.dataSet);

  const [state, setState] = useState({
    currentPage: query.get('page') ? parseInt(query.get('page')) : 1,
    pageSize: query.get('results') ? parseInt(query.get('results')) : 10,
    domain: query.get('d') ? query.get('d') : '',
    filter: query.get('st') ? query.get('st') : '',
    dataSet: customers,
  });

  const storeFronts = {};
  for (let i = 0; i < stores.length; i++) {
    storeFronts[stores[i]._id] = stores[i].name;
  }

  const handlePageSizeChange = (pageSize) => {
    setState({ ...state, currentPage: 1, pageSize });
    linkParser(1, pageSize, state.domain, state.filter);
  };

  const handleDomainChange = (e, id) => {
    e.preventDefault();
    setState({ ...state, currentPage: 1, domain: id });
    linkParser(1, state.pageSize, id, state.filter);
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
    const linker = `/console/customer-management/listing/?page=${page}&results=${pageSize}&d=${domain}&st=${filter}`;
    history.push(linker);
  };

  let { currentPage, pageSize, domain, filter, dataSet } = state;
  filter = filter.toLowerCase();

  let filtered = filter
    ? dataSet.filter(
        (f) =>
          f.contact.companyName.toLowerCase().includes(filter) ||
          f.contact.firstName.toLowerCase().includes(filter) ||
          f.contact.lastName.toLowerCase().includes(filter) ||
          f.contact.phone.toLowerCase().includes(filter) ||
          f.contact.email.toLowerCase().includes(filter),
      )
    : dataSet;

  filtered = domain
    ? filtered.filter((f) => f.storeFrontId === domain)
    : filtered;

  const count = filtered.length;
  const listing = Paginate(filtered, currentPage, pageSize);

  return (
    <>
      <PageTemplateHeader
        displayName="Client Management"
        button={{
          text: 'New Client',
          url: '/console/customer-management/new',
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
          storeFilter={true}
        />
      </div>

      <Card className="main-content-card">
        <Table striped hover size="sm" className="listingTable">
          <thead>
            <tr>
              <th>Company</th>
              <th>Status</th>
              <th className="hidden-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {listing.map((m) => (
              <tr key={m._id} className="listingTable-tr">
                <td>
                  {m.companyName && (
                    <>
                      <strong>{m.companyName}</strong>
                      {' - '}
                    </>
                  )}
                  {m.contact.firstName} {m.contact.lastName}
                  <br /> Store: {storeFronts && storeFronts[m.storeFrontId]}
                  <br />
                  {m.contact.email}
                  <br />
                  {m.contact.phone}
                  <br />
                  <CustomerManagmentListingOptions id={m._id} />
                </td>
                <td>{m.isActive ? 'Active' : 'In-Active'}</td>
                <td className="hidden-sm">{m.date.substring(0, 10)}</td>
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
