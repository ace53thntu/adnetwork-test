// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {FormProvider, useForm} from 'react-hook-form';
import {Badge, Col, Form, Label, Row} from 'reactstrap';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

// Internal Modules
import {schemaValidate} from '../validation';
import KeywordListSelect from 'components/forms/KeywordListSelect';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';
import DomainGroupSelect from 'components/forms/DomainGroupSelect';
import {BudgetTimeFrames, CappingTypes, IS_RESPONSE_ALL} from 'constants/misc';
import {ScheduleFormFields} from '../../../strategy/form-fields/ScheduleGroup';
import {WEEK_DAYS} from 'pages/Campaign/constants';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {convertApiToGui} from 'utils/handleCurrencyFields';
import {FormTextInput, FormToggle} from 'components/forms';
import {useGetCappings} from 'queries/capping';
import {useParams} from 'react-router-dom';
import {getResponseData} from 'utils/helpers/misc.helpers';

const propTypes = {
  capping: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

const CappingForm = ({capping = {}, onSubmit = () => null}) => {
  const {strategyId} = useParams();
  const {data: cappingUserDaily} = useGetCappings({
    params: {
      reference_uuid: strategyId,
      type: CappingTypes.USER.value,
      time_frame: BudgetTimeFrames.DAILY
    },
    enabled: capping?.type === CappingTypes.USER.value && !!strategyId
  });

  const daily = React.useMemo(
    () => getResponseData(cappingUserDaily, IS_RESPONSE_ALL)?.[0]?.target || 0,
    [cappingUserDaily]
  );

  const {t} = useTranslation();
  const cappingType = capping?.type || '';

  const defaultValues = React.useMemo(() => {
    if (
      cappingType === CappingTypes.BUDGET.value ||
      cappingType === CappingTypes.BUDGET_MANAGER.value
    ) {
      return {
        target: convertApiToGui({value: capping?.target}),
        status: capping?.status
      };
    }
    if (
      [
        CappingTypes.IMPRESSION.value,
        CappingTypes.USER.value,
        CappingTypes.USER_CLICK.value,
        CappingTypes.USER_VIEWABLE.value,
        CappingTypes.CLICK.value,
        CappingTypes.VIEWABLE.value
      ].includes(cappingType)
    ) {
      return {
        target: capping?.target,
        status: capping?.status,
        time_frame: capping?.time_frame / 60 || ''
      };
    }
    if (cappingType === CappingTypes.DOMAIN.value) {
      return {
        domain_group_white_list_uuid: capping?.domain_group_white_list?.map(
          item => ({value: item?.uuid, label: item?.name})
        ),
        domain_group_black_list_uuid: capping?.domain_group_black_list?.map(
          item => ({value: item?.uuid, label: item?.name})
        ),
        status: capping?.status
      };
    }
    if (cappingType === CappingTypes.KEYWORD.value) {
      return {
        keywords_list_white_uuid: capping?.keywords_list_white?.map(item => ({
          value: item?.uuid,
          label: item?.name
        })),
        keywords_list_black_uuid: capping?.keywords_list_black?.map(item => ({
          value: item?.uuid,
          label: item?.name
        })),
        status: capping?.status
      };
    }

    if (cappingType === CappingTypes.SCHEDULE.value) {
      const weekDays = capping?.week_days?.map(item => {
        const weekDayFound = WEEK_DAYS.find(weekDay => weekDay.value === item);
        if (weekDayFound) {
          return weekDayFound;
        }
        return null;
      });
      const startDate = moment().format('YYYY-MM-DD');
      const startDateTime = moment(
        `${startDate} ${capping.start_hour}:${capping.start_minute}`
      ).format('YYYY-MM-DD HH:mm');
      const endDate = moment().format('YYYY-MM-DD');
      const endDateTime = moment(
        `${endDate} ${capping.end_hour}:${capping.end_minute}`
      ).format('YYYY-MM-DD HH:mm');

      return {
        week_days: weekDays,
        start_time: new Date(startDateTime) || null,
        end_time: new Date(endDateTime) || null,
        status: capping?.status
      };
    }
  }, [capping, cappingType]);

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t, cappingType, daily)
  });
  const {handleSubmit} = methods;

  const renderDailyTarget = () => {
    return <strong>{`Daily target: ${daily}`}</strong>;
  };

  return (
    <div>
      <FormProvider {...methods}>
        <Form
          id="cappingForm"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Row>
            {(cappingType === CappingTypes.BUDGET.value ||
              cappingType === CappingTypes.BUDGET_MANAGER.value) && (
              <Col sm={6}>
                <CurrencyInputField
                  required
                  name="target"
                  placeholder="0.0"
                  label={t('target')}
                  decimalSeparator="."
                  groupSeparator=","
                  disableGroupSeparators={false}
                  decimalsLimit={3}
                  prefix="$"
                />
              </Col>
            )}

            {[
              CappingTypes.IMPRESSION.value,
              CappingTypes.USER.value,
              CappingTypes.USER_CLICK.value,
              CappingTypes.USER_VIEWABLE.value,
              CappingTypes.CLICK.value,
              CappingTypes.VIEWABLE.value
            ].includes(cappingType) &&
              !capping?.custom && (
                <Col sm={6}>
                  <CurrencyInputField
                    required
                    name="target"
                    placeholder="0.0"
                    label={t('target')}
                    allowDecimals={false}
                    disableGroupSeparators
                  />
                </Col>
              )}

            {cappingType === CappingTypes.USER.value && capping?.custom && (
              <Col md="8">
                <div className="mb-2">
                  Custom time frame ({renderDailyTarget()})
                </div>
                <div className="d-flex ">
                  <FormTextInput label="" placeholder="reach" name="target" />
                  <div className="mr-2 ml-2" style={{height: 38}}>
                    by
                  </div>
                  <FormTextInput
                    label=""
                    placeholder="time frame"
                    name="time_frame"
                  />
                  <div className="ml-2" style={{height: 38}}>
                    minute(s)
                  </div>
                </div>
              </Col>
            )}

            {/* Type */}
            <Col md="6">
              <Label className="mr-5">{t('type')}</Label>
              <div>
                <Badge color="primary">
                  {
                    Object.values(CappingTypes)?.find(
                      item => item.value === cappingType
                    )?.label
                  }
                </Badge>
              </div>
            </Col>
          </Row>

          {cappingType === CappingTypes.DOMAIN.value && (
            <Row>
              <Col md="6">
                <DomainGroupSelect
                  name={CAMPAIGN_KEYS.DOMAIN_GROUP_WHITE_UUID}
                  label={t('domainGroupWhite')}
                  placeholder={t('selectDomainGroupWhite')}
                  defaultValues={[]}
                  multiple
                />
              </Col>
              <Col md="6">
                <DomainGroupSelect
                  name={CAMPAIGN_KEYS.DOMAIN_GROUP_BLACK_UUID}
                  label={t('domainGroupBlack')}
                  placeholder={t('selectDomainGroupBlack')}
                  defaultValues={[]}
                  multiple
                />
              </Col>
            </Row>
          )}

          {cappingType === CappingTypes.KEYWORD.value && (
            <Row>
              <Col md="6">
                <KeywordListSelect
                  name={CAMPAIGN_KEYS.KEYWORD_LIST_WHITE_UUID}
                  label={t('keywordListWhite')}
                  placeholder={t('selectKeywordListWhite')}
                  defaultValues={[]}
                  multiple
                />
              </Col>
              <Col md="6">
                <KeywordListSelect
                  name={CAMPAIGN_KEYS.KEYWORD_LIST_BLACK_UUID}
                  label={t('keywordListBlack')}
                  placeholder={t('selectKeywordListBlack')}
                  defaultValues={[]}
                  multiple
                />
              </Col>
            </Row>
          )}

          {cappingType === CappingTypes.SCHEDULE.value && (
            <ScheduleFormFields
              weekDayName="week_days"
              startTimeName="start_time"
              endTimeName="end_time"
            />
          )}

          {[
            CappingTypes.SCHEDULE.value,
            CappingTypes.DOMAIN.value,
            CappingTypes.KEYWORD.value
          ].includes(cappingType) && (
            <Row>
              <Col md="3">
                <FormToggle
                  name="status"
                  defaultCheckedValue=""
                  label={t('status')}
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                />
              </Col>
            </Row>
          )}
        </Form>
      </FormProvider>
    </div>
  );
};

CappingForm.propTypes = propTypes;

export default CappingForm;
