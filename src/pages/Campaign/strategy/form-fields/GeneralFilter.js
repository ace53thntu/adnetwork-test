//---> Build-in Modules
import React, {Fragment} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';
import {useFormContext, useWatch} from 'react-hook-form';
import PropTypes from 'prop-types';

//---> Internal Modules
import {FormReactSelect, FormTextInput} from 'components/forms';
import {Collapse} from 'components/common/Collapse';
import {StrategySources, StrategyTypes} from 'pages/Campaign/constants';
import PositionSelect from 'components/forms/PositionSelect';
import LocationSelect from './LocationSelect';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';

const propTypes = {
  currentStrategy: PropTypes.object,
  isView: PropTypes.bool
};

const GeneralFilter = ({currentStrategy = {}, isView = false}) => {
  const {t} = useTranslation();
  const {control} = useFormContext();
  const strategyType = useWatch({name: 'strategy_type', control});

  return (
    <>
      {/* General Filter */}
      <Collapse initialOpen title="General Filter" unMount={false}>
        <Row>
          <Col md="4">
            <PositionSelect
              disabled={isView}
              defaultValue={currentStrategy?.position_uuids}
              name="position_uuids"
              label={t('position')}
              placeholder={t('position')}
              multiple={true}
            />
          </Col>
          <Col md="4">
            <FormReactSelect
              disabled={isView}
              defaultValue={currentStrategy?.sources}
              options={StrategySources}
              name="sources"
              label={t('source')}
              placeholder={t('selectSource')}
              multiple
            />
          </Col>
          <Col md="4">
            <LocationSelect
              name="location_uuids"
              defaultValue={currentStrategy?.location_uuids || []}
              label={t('location')}
              placeholder={t('selectLocation')}
              disabled={isView}
              multiple
            />
          </Col>

          {strategyType?.value === StrategyTypes.NORMAL && (
            <Col md="4">
              <CurrencyInputField
                required={false}
                name="cpm_max"
                placeholder="0.0"
                label="Price max"
                decimalSeparator="."
                groupSeparator=","
                disableGroupSeparators={false}
                decimalsLimit={3}
                prefix="$"
                disabled={isView}
              />
            </Col>
          )}

          {/* TODO: Set readonly because the logic not clear now */}
          <Col md="4">
            <FormTextInput
              type="text"
              placeholder={t('category')}
              id="category"
              name="category"
              label={t('category')}
              disabled={isView}
              readOnly
            />
          </Col>
        </Row>
      </Collapse>
    </>
  );
};

GeneralFilter.propTypes = propTypes;

export default GeneralFilter;
