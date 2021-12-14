//---> Build-in Modules
import React from 'react';

//---> External Modules
import {ButtonGroup, Button} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';

//---> Internal Modules
import {
  FilterButtonStyled,
  FilterContent,
  FilterWrap,
  SubmitButtonWrap
} from './styled';
import {useDispatch} from 'react-redux';
import {
  InitFilterParams,
  resetFilterParamsRedux,
  setFilterParamsRedux,
  setSearchTypeRedux,
  useSearchTypeSelector
} from 'store/reducers/inventory-market';
import {filterSchema} from './validation';
import {useTranslation} from 'react-i18next';
import {mappingFormToApi} from './dto';
import MarketTypeSelect from './market-type-select';
import {FilterTypes} from 'constants/inventory-market';
import FilterModeGroup from './filter-mode-group';

const FilterBar = ({children}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const searchType = useSearchTypeSelector();
  const methods = useForm({
    defaultValues: InitFilterParams,
    resolver: filterSchema(t)
  });
  const {
    handleSubmit,
    reset,
    formState: {isDirty}
  } = methods;

  function onClickButtonFilter(evt, type) {
    evt.preventDefault();
    if (searchType !== type) {
      reset(InitFilterParams);
      dispatch(setSearchTypeRedux(type));
    } else {
      reset(InitFilterParams);
      dispatch(setSearchTypeRedux(''));
    }
  }

  function onSubmit(formData) {
    const filterParams = mappingFormToApi(formData, searchType);
    dispatch(setFilterParamsRedux(filterParams));
  }

  function onClearFilterSearch(evt) {
    evt.preventDefault();

    dispatch(setFilterParamsRedux(InitFilterParams));
    reset(InitFilterParams);
  }

  React.useEffect(() => {
    return () => dispatch(resetFilterParamsRedux());
  }, [dispatch]);

  return (
    <>
      <FilterModeGroup />
      {/* Action Header */}
      <FilterButtonStyled>
        <ButtonGroup>
          {/* Filter button */}
          <Button
            color="primary"
            outline={searchType === FilterTypes.FILTER ? false : true}
            onClick={evt => onClickButtonFilter(evt, FilterTypes.FILTER)}
          >
            Filter
          </Button>

          {/* Search button */}
          <Button
            color="primary"
            outline={searchType === FilterTypes.SEARCH ? false : true}
            onClick={evt => onClickButtonFilter(evt, FilterTypes.SEARCH)}
          >
            Search
          </Button>
        </ButtonGroup>
        {/* Market type filter */}
        <MarketTypeSelect />
      </FilterButtonStyled>

      {/* Form */}
      <FormProvider {...methods}>
        <form id="filter-form" onSubmit={handleSubmit(onSubmit)}>
          <FilterWrap>
            <FilterContent>{children}</FilterContent>
            {searchType && isDirty && (
              <SubmitButtonWrap>
                <Button color="primary">
                  {searchType === 'filter' ? 'Filter' : 'Search'}
                </Button>
                <Button
                  color="link"
                  type="button"
                  onClick={onClearFilterSearch}
                >
                  Clear
                </Button>
              </SubmitButtonWrap>
            )}
          </FilterWrap>
        </form>
      </FormProvider>
    </>
  );
};

export default FilterBar;
