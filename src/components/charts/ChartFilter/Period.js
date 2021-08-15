import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Dropdown
} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import DateRangePicker from '../DateRangePicker';

import {ACTIVE_FILTER} from './constants';
import {defaultRanges} from '../DateRangePicker/constants';

function Period({
  defaultActiveFilter,
  onActiveFilter,
  ranges,
  disabled = false
}) {
  const {t} = useTranslation();
  const dateRangeRef = React.useRef(ranges);

  const getActiveClassName = React.useCallback(
    filterBy => (defaultActiveFilter === filterBy ? 'active' : ''),
    [defaultActiveFilter]
  );

  const activeDayClassName = React.useMemo(
    () => getActiveClassName(ACTIVE_FILTER.day),
    [getActiveClassName]
  );
  const activeWeekClassName = React.useMemo(
    () => getActiveClassName(ACTIVE_FILTER.week),
    [getActiveClassName]
  );
  const activeMonthClassName = React.useMemo(
    () => getActiveClassName(ACTIVE_FILTER.month),
    [getActiveClassName]
  );
  const active3MonthClassName = React.useMemo(
    () => getActiveClassName(ACTIVE_FILTER.threeMonths),
    [getActiveClassName]
  );
  const activeCustomClassName = React.useMemo(
    () => getActiveClassName(ACTIVE_FILTER.custom),
    [getActiveClassName]
  );

  const onHandleDayFilter = React.useCallback(() => {
    if (defaultActiveFilter !== ACTIVE_FILTER.day) {
      onActiveFilter(ACTIVE_FILTER.day);
      dateRangeRef.current = defaultRanges;
      setDropdownOpen(false);
    }
  }, [defaultActiveFilter, onActiveFilter]);

  const onHandleWeekFilter = React.useCallback(() => {
    if (defaultActiveFilter !== ACTIVE_FILTER.week) {
      onActiveFilter(ACTIVE_FILTER.week);
      dateRangeRef.current = defaultRanges;
      setDropdownOpen(false);
    }
  }, [defaultActiveFilter, onActiveFilter]);

  const onHandleMonthFilter = React.useCallback(() => {
    if (defaultActiveFilter !== ACTIVE_FILTER.month) {
      onActiveFilter(ACTIVE_FILTER.month);
      dateRangeRef.current = defaultRanges;
      setDropdownOpen(false);
    }
  }, [defaultActiveFilter, onActiveFilter]);

  const onHandleThreeMonthsFilter = React.useCallback(() => {
    if (defaultActiveFilter !== ACTIVE_FILTER.threeMonths) {
      onActiveFilter(ACTIVE_FILTER.threeMonths);
      dateRangeRef.current = defaultRanges;
      setDropdownOpen(false);
    }
  }, [defaultActiveFilter, onActiveFilter]);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const onChangeCustomPeriod = React.useCallback(() => {
    console.log('dateRangeRef.current: ', dateRangeRef.current);
    onActiveFilter(ACTIVE_FILTER.custom, dateRangeRef.current);
    setDropdownOpen(false);
  }, [onActiveFilter]);

  return (
    <div className="mb-3 text-center" style={{position: 'relative'}}>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen(!dropdownOpen)}
      >
        <ButtonGroup size="sm">
          <Button
            caret="true"
            color="primary"
            className={`btn-pill ${activeDayClassName}`}
            onClick={onHandleDayFilter}
            outline
            disabled={disabled}
          >
            {t('day')}
          </Button>
          <Button
            color="primary"
            className={`btn-pill ${activeWeekClassName}`}
            onClick={onHandleWeekFilter}
            outline
            disabled={disabled}
          >
            {t('week')}
          </Button>
          <Button
            outline
            color="primary"
            className={`btn-pill ${activeMonthClassName}`}
            onClick={onHandleMonthFilter}
            disabled={disabled}
          >
            {t('month')}
          </Button>
          <Button
            outline
            color="primary"
            className={`btn-pill ${active3MonthClassName}`}
            onClick={onHandleThreeMonthsFilter}
            disabled={disabled}
          >
            {t('3month')}
          </Button>
          <DropdownToggle
            outline
            color="primary"
            className={`btn-pill ${activeCustomClassName}`}
            disabled={disabled}
          >
            {t('custom')}
          </DropdownToggle>
        </ButtonGroup>

        <DropdownMenu className="rm-pointers z-index-8000">
          <DateRangePicker ranges={ranges} dateRangeRef={dateRangeRef} />
          <Nav vertical>
            <NavItem className="nav-item-divider" />
            <NavItem className="nav-item-btn text-center">
              <Button
                size="sm"
                className="btn-shadow"
                color="primary"
                onClick={onChangeCustomPeriod}
              >
                {t('apply')}
              </Button>
            </NavItem>
          </Nav>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

Period.propTypes = {
  onActiveFilter: PropTypes.func,
  defaultActiveFilter: PropTypes.oneOf(Object.values(ACTIVE_FILTER))
};

Period.defaultProps = {
  onActiveFilter: () => {},
  defaultActiveFilter: 'day'
};

export default React.memo(Period);
