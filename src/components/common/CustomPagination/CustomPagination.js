// Build-in Modules
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useListPagination, DOTS} from 'hooks/useListPagination';
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const propTypes = {
  onPageChange: PropTypes.func,
  totalCount: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  disabled: PropTypes.bool
};

const CustomPagination = props => {
  const {
    onPageChange = () => null,
    totalCount = 0,
    siblingCount = 1,
    currentPage = DEFAULT_PAGINATION.page,
    pageSize = DEFAULT_PAGINATION.perPage,
    disabled = false
  } = props;

  const paginationRange = useListPagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = evt => {
    evt.preventDefault();
    if (currentPage === lastPage) return;
    onPageChange(evt, currentPage + 1);
  };

  const onPrevious = evt => {
    console.log('🚀 ~ file: CustomPagination.js ~ line 50 ~ evt', evt);
    evt.preventDefault();
    if (currentPage === firstPage) return;
    onPageChange(evt, currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  let firstPage = 1;

  return (
    <div className="d-flex justify-content-end">
      <Pagination>
        <PaginationItem
          disabled={disabled || currentPage === firstPage}
          onClick={evt => onPageChange(evt, firstPage)}
        >
          {/* eslint-disable-next-line no-script-url */}
          <PaginationLink
            first
            href="#"
            onClick={evt => evt.preventDefault()}
          />
        </PaginationItem>
        <PaginationItem
          disabled={disabled || currentPage === firstPage}
          onClick={evt => onPrevious(evt)}
        >
          <PaginationLink
            previous
            onClick={onPrevious}
            // eslint-disable-next-line no-script-url
            href="#"
            disabled={disabled || currentPage === firstPage}
          />
        </PaginationItem>
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={`pr-dot-${idx}`} disabled={disabled}>
                <PaginationLink
                  //  eslint-disable-next-line no-script-url
                  href="#"
                  onClick={evt => evt.preventDefault()}
                >
                  &#8230;
                </PaginationLink>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem
              key={`pr=${pageNumber}`}
              disabled={disabled}
              active={pageNumber === currentPage}
              onClick={evt => onPageChange(evt, pageNumber)}
            >
              {/* eslint-disable-next-line no-script-url */}
              <PaginationLink href="#" onClick={evt => evt.preventDefault()}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem
          disabled={disabled || currentPage === lastPage}
          onClick={onNext}
        >
          {/* eslint-disable-next-line no-script-url */}
          <PaginationLink href="#" onClick={evt => evt.preventDefault()} next />
        </PaginationItem>
        <PaginationItem
          disabled={disabled || currentPage === lastPage}
          onClick={evt => onPageChange(evt, lastPage)}
        >
          {/* eslint-disable-next-line no-script-url */}
          <PaginationLink href="#" onClick={evt => evt.preventDefault()} last />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

CustomPagination.propTypes = propTypes;

export default CustomPagination;
