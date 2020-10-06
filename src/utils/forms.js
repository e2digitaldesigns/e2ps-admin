import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from 'react-bootstrap/Pagination';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const PaginationUI = ({
  itemsCount,
  currentPage,
  pageSize = 10,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount <= 1) return null;

  function pagination(c, m) {
    var current = c,
      last = m,
      delta = 5,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  // for (let i = 1, l = pagesCount; i <= l; i++)
  //   console.log(`Selected page ${i}:`, pagination(i, l));

  let pages = pagination(currentPage, pagesCount);

  return (
    <>
      <Pagination size="sm">
        <Pagination.First
          className={currentPage <= 1 ? 'disabled' : 'undefined'}
          onClick={() => onPageChange(1)}
        />

        <Pagination.Prev
          className={currentPage <= 1 ? 'disabled' : 'undefined'}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {pages.map((page, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === page}
            className={page === '...' ? 'disabled' : 'undefined'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}

        <Pagination.Next
          className={currentPage === pagesCount ? 'disabled' : 'undefined'}
          onClick={() => onPageChange(currentPage + 1)}
        />

        <Pagination.Last
          className={currentPage === pagesCount ? 'disabled' : 'undefined'}
          onClick={() => onPageChange(pagesCount)}
        />
      </Pagination>
    </>
  );
};

PaginationUI.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationUI;

export const Paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};

export const SearchFilter = ({
  pageSize,
  filter,
  domainId = null,
  handleDomainChange = null,
  handleFilterChange,
  handlePageSizeChange,
  storeFilter = false,
  submitButton = false,
  handleSubmit = null,
}) => {
  const storeFronts = useSelector((state) => state.system.storeFronts);
  const perPage = [5, 10, 25, 50, 100];
  const [resultsPerPage, SetResultsPerPage] = useState(pageSize);

  function updatePerPage(num) {
    SetResultsPerPage(num);
    handlePageSizeChange(num);
  }

  function domainName() {
    let theDomain =
      domainId === ''
        ? 'Store'
        : storeFronts.find((f) => f._id === domainId).domain;
    return theDomain;
  }

  return (
    <React.Fragment>
      <InputGroup size="sm">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="primary"
          title={resultsPerPage + ' Results Per Page '}
        >
          {perPage.map((m) => (
            <Dropdown.Item key={m} onClick={() => updatePerPage(m)}>
              {m}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        {storeFilter && (
          <DropdownButton
            as={InputGroup.Prepend}
            variant="secondary"
            title={domainName()}
          >
            <Dropdown.Item onClick={(e) => handleDomainChange(e, '')}>
              {'All Stores'}
            </Dropdown.Item>

            {storeFronts.map((m) => (
              <Dropdown.Item
                key={m._id}
                onClick={(e) => handleDomainChange(e, m._id)}
              >
                {m.domain + ' - ' + m.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}

        <FormControl
          aria-describedby="basic-addon1"
          value={filter}
          onChange={(e) => handleFilterChange(e)}
        />

        {submitButton && (
          <Button
            variant="primary"
            size="sm"
            as={InputGroup.Append}
            onClick={handleSubmit}
          >
            Search
          </Button>
        )}
      </InputGroup>
    </React.Fragment>
  );
};

const states = [
  { abbr: 'AL', name: 'Alabama' },
  { abbr: 'AK', name: 'Alaska' },
  { abbr: 'AZ', name: 'Arizona' },
  { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' },
  { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' },
  { abbr: 'DC', name: 'District of Columbia' },
  { abbr: 'DE', name: 'Delaware' },
  { abbr: 'FL', name: 'Florida' },
  { abbr: 'GA', name: 'Georgia' },
  { abbr: 'HI', name: 'Hawaii' },
  { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' },
  { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' },
  { abbr: 'KS', name: 'Kansas' },
  { abbr: 'KY', name: 'Kentucky' },
  { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' },
  { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' },
  { abbr: 'MI', name: 'Michigan' },
  { abbr: 'MN', name: 'Minnesota' },
  { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' },
  { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' },
  { abbr: 'NV', name: 'Nevada' },
  { abbr: 'NH', name: 'New Hampshire' },
  { abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' },
  { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' },
  { abbr: 'ND', name: 'North Dakota' },
  { abbr: 'OH', name: 'Ohio' },
  { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' },
  { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' },
  { abbr: 'SC', name: 'South Carolina' },
  { abbr: 'SD', name: 'South Dakota' },
  { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' },
  { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' },
  { abbr: 'VA', name: 'Virginia' },
  { abbr: 'WA', name: 'Washington' },
  { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' },
  { abbr: 'WY', name: 'Wyoming' },
];

export const FormStates = () => {
  return (
    <>
      {states.map((m, index) => (
        <option key={index} value={m.abbr}>
          {m.name}
        </option>
      ))}
    </>
  );
};
