import {FilterTypes} from 'constants/inventory-market';
import React from 'react';
import {useDispatch} from 'react-redux';
import {ButtonGroup, Button} from 'reactstrap';
import {
  InitFilterParams,
  setFilterParamsRedux,
  setSearchTypeRedux,
  useFilterParamsSelector
} from 'store/reducers/inventory-market';
import {mappingFormToApi} from './dto';

const MarketTypeSelect = () => {
  const dispatch = useDispatch();
  const filterParams = useFilterParamsSelector();
  const activedMarketType = filterParams?.market_type || '';

  function onClickMarketType(evt, type) {
    evt.preventDefault();
    const filterParams = mappingFormToApi(
      {...InitFilterParams, market_type: type},
      FilterTypes.FILTER
    );

    dispatch(setSearchTypeRedux(FilterTypes.FILTER));
    dispatch(setFilterParamsRedux(filterParams));
  }

  return (
    <ButtonGroup className="ml-2">
      <Button
        type="button"
        outline={activedMarketType === 'private' ? false : true}
        color="success"
        onClick={evt => onClickMarketType(evt, 'private')}
      >
        Private
      </Button>
      <Button
        type="button"
        outline={activedMarketType === 'public' ? false : true}
        color="success"
        onClick={evt => onClickMarketType(evt, 'public')}
      >
        Public
      </Button>
    </ButtonGroup>
  );
};

export default MarketTypeSelect;
