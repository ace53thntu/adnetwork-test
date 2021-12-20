// Build-in Modules
import React from 'react';

// External Modules
import {useDispatch} from 'react-redux';
import {ButtonGroup, Button} from 'reactstrap';

// Internal Modules
import {FilterMode} from 'constants/inventory-market';
import {
  setFilterModeRedux,
  useFilterModeSelector
} from 'store/reducers/inventory-market';
import {capitalize} from 'utils/helpers/string.helpers';
import {FilterModeGroupStyled} from './styled';

const FilterModeGroup = () => {
  const dispatch = useDispatch();
  const filterMode = useFilterModeSelector();

  function onClickMode(evt, mode) {
    evt.preventDefault();
    dispatch(setFilterModeRedux(mode));
  }

  return (
    <FilterModeGroupStyled>
      <ButtonGroup className="ml-2">
        {Object.entries(FilterMode).map(modeItem => {
          const [modeKey, modeValue] = modeItem;
          return (
            <Button
              key={modeKey}
              type="button"
              outline={filterMode === modeValue ? false : true}
              color="primary"
              onClick={evt => onClickMode(evt, modeValue)}
            >
              {capitalize(modeValue)}
            </Button>
          );
        })}
      </ButtonGroup>
    </FilterModeGroupStyled>
  );
};

export default FilterModeGroup;
