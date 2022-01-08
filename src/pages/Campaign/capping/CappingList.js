//---> Build-in component
import React, {Fragment, useMemo} from 'react';

//---> External Component
import {useParams} from 'react-router';
import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import {v4 as uiidv4} from 'uuid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';

//---> Internal Component
import {WEEK_DAYS} from '../constants';
import CappingActionHeader from './CappingActionHeader';
import CappingItem from './CappingItem';
import FormCapping from './FormCapping';
import FormWeekPark from './FormWeekPart';
import useHandleCapping from './hooks/useHandleCapping';
import {useGetCappings} from 'queries/capping';
import {useGetWeekparts} from 'queries/weekpart';

const INIT_CAPPING = {
  campaign_id: '',
  strategy_id: '',
  ctype: '',
  climit: '',
  type_frame: '',
  smooth: ''
};

const INIT_WEEK_PART = {
  strategy_id: '',
  week_day: '',
  start_hour: '',
  start_minute: '',
  end_hour: '',
  end_minute: ''
};

const CappingList = () => {
  const {strategyId} = useParams();
  const {
    handleShowCappingForm,
    handleShowWeekPartForm,
    showFormCapping,
    showFormWeekPart,
    handleCloseCappingForm,
    handleCloseWeekPartForm,
    currentObject,
    typeText
  } = useHandleCapping();

  // Execute Apis
  const {data: cappingsRes = []} = useGetCappings({strategyId});
  const listCapping = useMemo(() => {
    return cappingsRes?.items ?? [];
  }, [cappingsRes?.items]);
  const {data: weekpartRes = []} = useGetWeekparts({strategyId});

  const listWeekpart = useMemo(() => {
    return weekpartRes?.items ?? [];
  }, [weekpartRes?.items]);

  const combieData = useMemo(() => {
    const destructureCapping = [...listCapping]?.map(item => {
      return {
        ...item,
        ...INIT_WEEK_PART,
        type: 'capping',
        typeText: 'Capping'
      };
    });
    const destructureWeekPart = [...listWeekpart]?.map(item => {
      const {week_day = ''} = item;
      let weekDaysLabel = [week_day]?.map(weekDayItem => {
        const foundData = WEEK_DAYS.find(
          labelItem => labelItem.value === weekDayItem
        );

        return foundData?.label ?? '';
      });
      weekDaysLabel = weekDaysLabel.length > 0 ? weekDaysLabel.join(', ') : '';
      return {
        ...item,
        ...INIT_CAPPING,
        type: 'week-part',
        typeText: 'Week Part',
        week_day: weekDaysLabel
      };
    });
    return [...destructureCapping, ...destructureWeekPart];
  }, [listCapping, listWeekpart]);

  const handleClickAdd = menuIndex => {
    switch (menuIndex) {
      case 0:
        handleShowCappingForm();
        break;
      case 1:
        handleShowWeekPartForm();
        break;
      default:
        break;
    }
  };

  return (
    <Container fluid>
      <ListGroup flush>
        <div className="text-right">
          <CappingActionHeader handleClickAdd={handleClickAdd} />
        </div>
        {/* BEGIN: Form Capping */}
        <Collapse className="mb-3" in={showFormCapping}>
          <Card className="mb-2">
            <CardHeader
              title={`${!currentObject ? 'Add ' : 'Edit '} ${typeText}`}
            />
            <CardContent style={{paddingTop: 0}}>
              {showFormCapping ? (
                <FormCapping
                  onCloseForm={handleCloseCappingForm}
                  capId={currentObject}
                />
              ) : null}
            </CardContent>
          </Card>
        </Collapse>
        {/* END: Form Capping */}

        {/* BEGIN: Form Week Part */}
        <Collapse className="mb-3" in={showFormWeekPart}>
          <Card className="mb-2">
            <CardHeader
              title={`${!currentObject ? 'Add ' : 'Edit '} ${typeText}`}
            />
            <CardContent style={{paddingTop: 0}}>
              {showFormWeekPart ? (
                <FormWeekPark onCloseForm={handleCloseWeekPartForm} />
              ) : null}
            </CardContent>
          </Card>
        </Collapse>
        {/* END: Form Week Part */}

        {combieData?.length ? (
          <>
            {combieData?.map(capping => {
              return (
                <Fragment key={`pr-${uiidv4()}`}>
                  <CappingItem capping={capping} />
                </Fragment>
              );
            })}
          </>
        ) : (
          <ListGroupItem>
            <div>
              <strong>No data</strong>
            </div>
          </ListGroupItem>
        )}
      </ListGroup>
    </Container>
  );
};

export default CappingList;
