//---> Build-in Modules
import React from 'react';

//---> External Modules
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {FormProvider, useForm} from 'react-hook-form';

//---> Internal Modules
import {
  FilterButton,
  FilterButtonStyled,
  FilterContent,
  FilterWrap,
  SubmitButtonWrap
} from './styled';
import {useDispatch} from 'react-redux';
import {
  InitParamFilter,
  setFilterParamsRedux,
  setSearchTypeRedux,
  useSearchTypeSelector
} from 'store/reducers/inventory-market';
import {ActionTypes} from 'pages/InventoryMarket/constants';
import {Button} from 'reactstrap';
import {filterSchema} from './validation';
import {useTranslation} from 'react-i18next';
import {mappingFormToApi} from './dto';

const FilterBar = ({children}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const searchType = useSearchTypeSelector();
  const methods = useForm({
    defaultValues: InitParamFilter,
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
      reset(InitParamFilter);
      dispatch(setSearchTypeRedux(type));
    } else {
      reset(InitParamFilter);
      dispatch(setSearchTypeRedux(''));
    }
  }

  function onSubmit(formData) {
    const filterParams = mappingFormToApi(formData, searchType);
    dispatch(setFilterParamsRedux(filterParams));
  }

  function onClearFilterSearch(evt) {
    evt.preventDefault();

    dispatch(setFilterParamsRedux(InitParamFilter));
    reset(InitParamFilter);
  }

  return (
    <>
      {/* Action Header */}
      <FilterButtonStyled title="Filter">
        <ButtonGroup color="primary" aria-label=" primary button group">
          {/* Filter button */}
          <FilterButton
            color="primary"
            aria-label="filter"
            component="span"
            isActived={searchType === ActionTypes.FILTER ? 'true' : 'false'}
            onClick={evt => onClickButtonFilter(evt, ActionTypes.FILTER)}
          >
            <span className="mr-2">Filter</span>
            <FilterListIcon fontSize="small" />
          </FilterButton>

          {/* Search button */}
          <FilterButton
            color="primary"
            aria-label="search"
            component="span"
            isActived={searchType === ActionTypes.SEARCH ? 'true' : 'false'}
            onClick={evt => onClickButtonFilter(evt, ActionTypes.SEARCH)}
          >
            <span className="mr-2">Search</span>
            <SearchIcon fontSize="small" />
          </FilterButton>
        </ButtonGroup>
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
