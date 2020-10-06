import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PageTemplateHeader } from '../../../../template/template-main-content/template-main-content-assets';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import PaginationUI, {
  Paginate,
  SearchFilter,
} from '../../../../../utils/forms';

import { fetchProducts } from '../../../../../redux/actions/products/productActions';
import ErrorPage from '../../_utils/_errors/error';
import LoadingPage from '../../_utils/_loading/loading';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const stores = useSelector((state) => state.system.storeFronts);
  const products = useSelector((state) => state.products.listing);

  const [documentState, setDocumentState] = useState({
    docReady: false,
  });

  const [state, setState] = useState({
    currentPage: query.get('page') ? parseInt(query.get('page')) : 1,
    pageSize: query.get('results') ? parseInt(query.get('results')) : 10,
    domain: query.get('d') ? query.get('d') : '',
    filter: query.get('st') ? query.get('st') : '',
  });

  useEffect(() => {
    let stillHere = true;
    const loadData = async () => {
      try {
        const result = await dispatch(fetchProducts());

        console.clear();
        console.log(45, result);
        if (result.error.errorCode === '0x0' && stillHere) {
          setDocumentState((documentState) => ({
            ...documentState,
            docReady: true,
          }));
        } else {
          throw result;
        }
      } catch (err) {
        toast.error(err.error.errorDesc);
      }
    };

    loadData();
    return () => {
      stillHere = false;
    };
  }, [dispatch]);

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
    const linker = `/console/product-management/products/listing/?page=${page}&results=${pageSize}&d=${domain}&st=${filter}`;
    history.replace(linker);
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

  if (products.error && products.error !== null)
    return <ErrorPage error={products.error} />;

  if (!documentState.docReady) return <LoadingPage />;

  return (
    <>
      <PageTemplateHeader
        displayName="Product Management"
        button={{
          text: 'New Product',
          url: '/console/product-management/products/new',
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
                  {m.name}
                  <br />
                  <Link
                    to={'/console/product-management/product/profile/' + m._id}
                  >
                    View
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
