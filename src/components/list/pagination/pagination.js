//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Button, Spinner} from 'reactstrap';

const Pagination = ({
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage = () => null
}) => {
  return (
    <div className="d-flex justify-content-center mt-3 mb-3">
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        color="primary"
        size="sm"
      >
        {isFetchingNextPage && (
          <Spinner color="light" size="sm" className="mr-2" />
        )}
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </Button>
    </div>
  );
};

Pagination.propsTypes = {
  hasNextPage: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func
};

export default Pagination;
