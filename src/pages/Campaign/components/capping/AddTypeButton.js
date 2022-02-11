//---> Build-in Modules
import React from 'react';

//---> External Modules
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import PropTypes from 'prop-types';

//---> Internal Modules
import {CappingTypes} from 'constants/misc';

const propTypes = {
  existedTypes: PropTypes.array
};

export default function AddTypeButton({existedTypes = []}) {
  return (
    <UncontrolledButtonDropdown direction="down">
      <DropdownToggle caret color="primary">
        Add capping
      </DropdownToggle>
      <DropdownMenu>
        {Object.entries(CappingTypes)?.map(([key, type]) => {
          if (type?.value === CappingTypes.SCHEDULE.value) {
            return null;
          }
          return (
            <DropdownItem
              key={key}
              disabled={existedTypes.includes(type?.value)}
            >
              {type?.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}

AddTypeButton.propTypes = propTypes;
