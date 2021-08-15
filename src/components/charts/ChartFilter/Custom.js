import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from 'reactstrap';
import {capitalize} from 'core/utils/stringUtils';

function CustomFilters({activeFilter, onFilterChange, filterOptions}) {
  return (
    <div className="mb-3 text-center">
      <ButtonGroup size="sm">
        {filterOptions.map((item, idx) => {
          return (
            <Button
              caret="true"
              color="primary"
              className={`btn-pill ${activeFilter === item ? 'active' : ''}`}
              onClick={() => onFilterChange(item)}
              outline
              key={idx}
            >
              {capitalize(item)}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

CustomFilters.propTypes = {
  onFilterChange: PropTypes.func,
  activeFilter: PropTypes.string,
  filterOptions: PropTypes.array.isRequired
};

CustomFilters.defaultProps = {
  onFilterChange: () => {},
  activeFilter: 'Option 1',
  filterOptions: ['Option 1', 'Option 2']
};

export default React.memo(CustomFilters);
