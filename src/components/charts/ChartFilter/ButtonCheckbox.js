import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from 'reactstrap';
import {capitalize} from 'core/utils/stringUtils';

function ButtonCheckbox({activeFilters, onFilterChange, filterOptions}) {
  return (
    <div className="mb-3 text-center">
      <ButtonGroup size="sm">
        {filterOptions.map((item, idx) => {
          return (
            <Button
              caret="true"
              color="primary"
              className={`btn-pill ${
                activeFilters.includes(item) ? 'active' : ''
              }`}
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

ButtonCheckbox.propTypes = {
  onFilterChange: PropTypes.func,
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  filterOptions: PropTypes.array.isRequired
};

ButtonCheckbox.defaultProps = {
  onFilterChange: () => {},
  activeFilters: ['Option 1'],
  filterOptions: ['Option 1', 'Option 2']
};

export default React.memo(ButtonCheckbox);
