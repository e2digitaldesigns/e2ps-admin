import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageTemplateHeader } from '../../../template/template-main-content/template-main-content-assets';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import PaginationUI, { Paginate, SearchFilter } from '../../../../utils/forms';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const history = useHistory();
  const query = useQuery();
  const staff = useSelector((state) => state.staffListing.dataSet);

  const [state, setState] = useState({
    currentPage: query.get('page') ? parseInt(query.get('page')) : 1,
    pageSize: query.get('results') ? parseInt(query.get('results')) : 10,
    filter: query.get('st') ? query.get('st') : '',
    dataSet: staff,
  });

  const handlePageSizeChange = (pageSize) => {
    setState({ ...state, currentPage: 1, pageSize });
    linkParser(1, pageSize, state.filter);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setState({ ...state, currentPage: 1, filter: e.target.value });
    linkParser(1, state.pageSize, e.target.value);
  };

  const handlePageChange = (page) => {
    setState({ ...state, currentPage: page });
    linkParser(page, state.pageSize, state.filter);
  };

  const linkParser = (page, pageSize, filter) => {
    console.clear();
    const linker = `/console/staff-management/listing/?page=${page}&results=${pageSize}&st=${filter}`;
    history.push(linker);
  };

  let { currentPage, pageSize, filter, dataSet } = state;
  filter = filter.toLowerCase();

  let filtered = filter
    ? dataSet.filter(
        (f) =>
          f.name.toLowerCase().includes(filter) ||
          f.email.toLowerCase().includes(filter),
      )
    : dataSet;

  const count = filtered.length;
  const listing = Paginate(filtered, currentPage, pageSize);

  return (
    <>
      <PageTemplateHeader
        displayName="Staff Management"
        button={{
          text: 'New Staff Member',
          url: '/console/staff-management/new',
        }}
      />

      <div className="listingTable-filter-holder">
        <SearchFilter
          pageSize={state.pageSize}
          filter={state.filter}
          handleFilterChange={handleFilterChange}
          handlePageSizeChange={handlePageSizeChange}
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
                  {m.name}
                  <br />
                  {m.email}
                  <br />
                  <Link to={'/console/staff-management/profile/' + m._id}>
                    Edit
                  </Link>
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
