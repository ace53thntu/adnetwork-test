//---> Build-in Modules
import React, {Fragment, useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import SelectStrategyItem from '../SelectStrategyItem';
import {BIDDING_METHODS, KPIS, listEngine} from '../../constants';
import {FormTextInput} from 'components/forms';

const EngineConfigurationGroup = ({viewOnly, currentStrategy}) => {
  const {t} = useTranslation();

  const [isShow, setIsShow] = useState(true);

  const handleToggleGroup = useCallback(evt => {
    evt.preventDefault();
    setIsShow(prevState => !prevState);
  }, []);

  return (
    <>
      {/* Engine Configuration*/}
      <FormGroup tag="fieldset" row className={'border border-gray'}>
        <legend
          className="col-form-label col-sm-3 w- ml-3 c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
          style={{width: '195px'}}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />
          Engine Configuration
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={listEngine}
                currentStrategy={currentStrategy}
                name="engine"
                label={t('engine')}
                placeholder={t('selectAEngine')}
                isMulti={false}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                placeholder={'0'}
                name="engine_configuration.max"
                label={t('max')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                placeholder={'0'}
                name="engine_configuration.num_impressions"
                label={t('numImpressions')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration.cpx_min"
                label={t('cpxMin')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration.cpx_max"
                label={t('cpxMax')}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration.value"
                label={t('value')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration.target"
                label={t('target')}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration.threshold"
                label={t('threshold')}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration.discovery_bid_price"
                label={t('discoveryBidPrice')}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={BIDDING_METHODS}
                currentStrategy={currentStrategy}
                label={t('biddingMethod')}
                placeholder={t('biddingMethod')}
                name="engine_configuration.bidding_method"
                isMulti={false}
                isRequired={true}
                defaultValue={
                  currentStrategy?.engine_configuration?.bidding_method
                }
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={KPIS}
                currentStrategy={currentStrategy}
                label={t('kpi')}
                placeholder={t('kpi')}
                name="engine_configuration.kpi"
                isMulti={false}
                isRequired={true}
                defaultValue={currentStrategy?.engine_configuration?.kpi}
              />
            </Col>
          </Row>
        </Col>
      </FormGroup>
    </>
  );
};

export default EngineConfigurationGroup;
