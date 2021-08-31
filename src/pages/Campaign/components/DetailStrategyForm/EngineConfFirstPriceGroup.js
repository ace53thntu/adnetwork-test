//---> Build-in Modules
import React, {Fragment, useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import SelectStrategyItem from '../SelectStrategyItem';
import {BIDDING_METHODS, KPIS, listEngineFirstPrice} from '../../constants';
import {FormTextInput} from 'components/forms';

const EngineConfigurationFirstPriceGroup = ({viewOnly, currentStrategy}) => {
  const {t} = useTranslation();

  const [isShow, setIsShow] = useState(true);

  const handleToggleGroup = useCallback(evt => {
    evt.preventDefault();
    setIsShow(prevState => !prevState);
  }, []);

  return (
    <>
      {/* Engine Configuration First Price */}
      <FormGroup tag="fieldset" row className={'border border-gray'}>
        <legend
          className="col-form-label col-sm-4 c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
          style={{width: '280px'}}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />
          Engine Configuration First Price
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="6">
              <SelectStrategyItem
                name="engine_first_price"
                label={t('engineFirstPrice')}
                placeholder={t('engineFirstPrice')}
                listOptions={listEngineFirstPrice}
                disabled={viewOnly}
                currentStrategy={currentStrategy}
                isRequired
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                placeholder={'0'}
                name="engine_configuration_first_price.max"
                label={t('max')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                placeholder={'0'}
                name="engine_configuration_first_price.num_impressions"
                label={t('numImpressions')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration_first_price.cpx_min"
                label={t('cpxMin')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration_first_price.cpx_max"
                label={t('cpxMax')}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration_first_price.value"
                label={t('value')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration_first_price.target"
                label={t('target')}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration_first_price.threshold"
                label={t('threshold')}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={'0.0'}
                name="engine_configuration_first_price.discovery_bid_price"
                label={t('discoveryBidPrice')}
                isRequired={true}
              />
            </Col>
            <Col md="6">
              {/* <FormTextInput
                type="text"
                placeholder={t('kpi')}
                name="engine_configuration_first_price.kpi"
                label={t('kpi')}
                isRequired={true}
              /> */}
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={BIDDING_METHODS}
                currentStrategy={currentStrategy}
                label={t('biddingMethod')}
                placeholder={t('biddingMethod')}
                name="engine_configuration_first_price.bidding_method"
                isMulti={false}
                isRequired={true}
                defaultValue={
                  currentStrategy?.engine_configuration_first_price
                    ?.bidding_method
                }
              />
            </Col>
            <Col md="6">
              {/* <FormTextInput
                type="text"
                placeholder={t('biddingMethod')}
                name="engine_configuration_first_price.bidding_method"
                label={t('biddingMethod')}
                isRequired={true}
              /> */}
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={KPIS}
                currentStrategy={currentStrategy}
                label={t('kpi')}
                placeholder={t('kpi')}
                name="engine_configuration_first_price.kpi"
                isMulti={false}
                isRequired={true}
                defaultValue={
                  currentStrategy?.engine_configuration_first_price?.kpi
                }
              />
            </Col>
          </Row>
        </Col>
      </FormGroup>
    </>
  );
};

export default EngineConfigurationFirstPriceGroup;
