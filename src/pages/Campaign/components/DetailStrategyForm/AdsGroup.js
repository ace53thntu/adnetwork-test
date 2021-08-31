//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
// import {useGetNetworks} from 'core/queries';
// import {useGetDeals} from 'core/queries/deal/useGetDeals';
// import {useGetIpRanges} from 'core/queries/ip-range';
// import {useGetPositions} from 'core/queries/position';
import SelectStrategyItem from '../SelectStrategyItem';
import {
  ACCEPTED_ADUNITS,
  ACCEPTED_CONTEXTS,
  ACCEPTED_LAYOUTS,
  ACCEPTED_PLACEMENTS,
  ACCEPTED_SUB_CONTEXTS
} from '../../constants';
import {useDestructureListToOptions} from '../../hooks';
import {ActiveToogle, FormTextInput} from 'components/forms';

const AdsGroup = ({viewOnly = false, currentStrategy}) => {
  const {t} = useTranslation();
  // Execute APIs list
  // const {data: positions = []} = useGetPositions();
  // const {data: ipRanges = []} = useGetIpRanges();
  // const {data: networks = []} = useGetNetworks();
  // const {data: deals = []} = useGetDeals();
  let positions,
    ipRanges,
    networks,
    deals = [];

  // Destructure data from API response
  const destructurePositions = useDestructureListToOptions({
    listData: positions
  });
  const destructureIpRanges = useDestructureListToOptions({
    listData: ipRanges
  });
  const destructureNetworks = useDestructureListToOptions({
    listData: networks
  });
  const destructureDeals = useDestructureListToOptions({
    listData: deals
  });

  // Initialize RHF
  const {control} = useFormContext();

  // Define states
  const [isShow, setIsShow] = useState(true);

  // Handle input events
  const handleToggleGroup = useCallback(evt => {
    evt.preventDefault();
    setIsShow(prevState => !prevState);
  }, []);

  return (
    <>
      <FormGroup tag="fieldset" row className="border border-gray">
        <legend
          className="col-form-label col-sm-2 ml-3 w-130px c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />{' '}
          Ads
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={ACCEPTED_LAYOUTS}
                currentStrategy={currentStrategy}
                name={'accepted_layouts'}
                label={t('acceptedLayouts')}
                placeholder={t('acceptedLayouts')}
                isMulti={true}
                isRequired={false}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={ACCEPTED_ADUNITS}
                currentStrategy={currentStrategy}
                name={'accepted_adunits'}
                label={t('acceptedAdunits')}
                placeholder={t('acceptedAdunits')}
                isMulti={true}
                isRequired={false}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={ACCEPTED_CONTEXTS}
                currentStrategy={currentStrategy}
                name={'accepted_contexts'}
                label={t('acceptedContexts')}
                placeholder={t('acceptedContexts')}
                isMulti={true}
                isRequired={false}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={ACCEPTED_SUB_CONTEXTS}
                currentStrategy={currentStrategy}
                name={'accepted_sub_contexts'}
                label={t('acceptedSubContexts')}
                placeholder={t('acceptedSubContexts')}
                isMulti={true}
                isRequired={false}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={ACCEPTED_PLACEMENTS}
                currentStrategy={currentStrategy}
                name={'accepted_placements'}
                label={t('acceptedPlacements')}
                placeholder={t('acceptedPlacements')}
                isMulti={true}
                isRequired={false}
              />
            </Col>

            <Col md="6">
              <FormTextInput
                type="number"
                placeholder={t('viewRatePrediction')}
                id="view_rate_prediction"
                name="view_rate_prediction"
                label={t('viewRatePrediction')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>

            <Col md="6">
              {/* Position */}
              <SelectStrategyItem
                isRequired={false}
                name="position_ids"
                label={t('position')}
                placeholder={t('position')}
                listOptions={destructurePositions}
                disabled={viewOnly}
                isMulti
                currentStrategy={currentStrategy}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                isRequired={false}
                name="ip_range_list_ids"
                label={t('ipRangeList')}
                placeholder={t('ipRangeList')}
                listOptions={destructureIpRanges}
                disabled={viewOnly}
                isMulti
                currentStrategy={currentStrategy}
              />
            </Col>

            <Col md="6">
              <SelectStrategyItem
                isRequired={false}
                name="network_ids"
                label={t('network')}
                placeholder={t('network')}
                listOptions={destructureNetworks}
                disabled={viewOnly}
                isMulti
                currentStrategy={currentStrategy}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                isRequired={false}
                name="deal_ids"
                label={t('deal')}
                placeholder={t('deal')}
                listOptions={destructureDeals}
                disabled={viewOnly}
                isMulti
                currentStrategy={currentStrategy}
              />
            </Col>

            <Col md="2">
              <Label className="mr-5">Ads Restrictive</Label>
              <Controller
                control={control}
                name="ads_restrictive"
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle
                    value={value}
                    onChange={onChange}
                    disabled={viewOnly}
                  />
                )}
              />
            </Col>

            <Col md="2">
              <Label className="mr-5">Inefficient Restrictive</Label>
              <Controller
                control={control}
                name="inefficient_restrictive"
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle
                    value={value}
                    onChange={onChange}
                    disabled={viewOnly}
                  />
                )}
              />
            </Col>
            <Col md="2">
              <Label className="mr-5">Use view rate prediction</Label>
              <Controller
                control={control}
                name="use_view_rate_prediction_if_support"
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle
                    value={value}
                    onChange={onChange}
                    disabled={viewOnly}
                  />
                )}
              />
            </Col>
            <Col md="3">
              <Label className="mr-5">Force Deal</Label>
              <Controller
                control={control}
                name="forceDeal"
                render={({onChange, onBlur, value, name}) => (
                  <ActiveToogle
                    value={value}
                    onChange={onChange}
                    disabled={viewOnly}
                  />
                )}
              />
            </Col>
          </Row>
        </Col>
      </FormGroup>
    </>
  );
};

export default AdsGroup;
