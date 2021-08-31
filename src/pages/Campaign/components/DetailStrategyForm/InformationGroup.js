//---> Build-in Modules
import React, {Fragment, useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import SelectCampaign from '../SelectCampaign';
import SelectStrategyItem from '../SelectStrategyItem';
// import {useGetFamilies} from 'core/queries/family/useGetFamilies';
import {useDestructureListToOptions} from '../../hooks';
import {FormTextInput} from 'components/forms';

const InformationGroup = ({
  listCampaignOptions,
  viewOnly,
  currentStrategy,
  isEdit
}) => {
  const {t} = useTranslation();

  // const {data: listFamilies = []} = useGetFamilies();
  const listFamilies = [];
  const destructureFamilies = useDestructureListToOptions({
    listData: listFamilies
  });
  const [isShow, setIsShow] = useState(true);

  const handleToggleGroup = useCallback(evt => {
    evt.preventDefault();
    setIsShow(prevState => !prevState);
  }, []);

  return (
    <>
      {/* Information */}
      <FormGroup tag="fieldset" row className={'border border-gray'}>
        <legend
          className="col-form-label col-sm-2 ml-3 w-130px c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />
          Information
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="6">
              <SelectCampaign
                t={t}
                listCampaignOptions={listCampaignOptions}
                viewOnly={viewOnly}
                currentStrategy={currentStrategy}
                isEdit={isEdit}
              />
            </Col>
            <Col md="6">
              <SelectStrategyItem
                viewOnly={viewOnly}
                listOptions={destructureFamilies}
                currentStrategy={currentStrategy}
                name={'family_ids'}
                label={t('family')}
                placeholder={t('family')}
                isMulti={true}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="text"
                placeholder={t('strategyName')}
                id="name"
                name="name"
                label={t('name')}
                isRequired={true}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                placeholder="Skip Delay"
                id="skip_delay"
                name="skip_delay"
                label="Skip Delay"
                isRequired={false}
              />
            </Col>
          </Row>
        </Col>
      </FormGroup>
    </>
  );
};

export default InformationGroup;
