//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import {FormTextInput} from 'components/forms';

const CostGroup = ({viewOnly}) => {
  const {t} = useTranslation();

  const [isShow, setIsShow] = useState(true);

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
          Costs
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="3">
              <FormTextInput
                type="number"
                placeholder={t('Cpi')}
                id="cpi"
                name="cpi"
                label={t('Cpi')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="3">
              <FormTextInput
                type="number"
                placeholder={t('Cpc')}
                id="cpc"
                name="cpc"
                label={t('Cpc')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="3">
              <FormTextInput
                type="number"
                placeholder={t('Cpcc')}
                id="cpcc"
                name="cpcc"
                label={t('Cpcc')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="3">
              <FormTextInput
                type="number"
                placeholder={t('Cpvc')}
                id="cpvc"
                name="cpvc"
                label={t('Cpvc')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>

            <Col md="3">
              <FormTextInput
                type="number"
                placeholder={t('Cplpc')}
                id="cplpc"
                name="cplpc"
                label={t('Cplpc')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="3">
              <FormTextInput
                type="number"
                placeholder={t('Cplpv')}
                id="cplpv"
                name="cplpv"
                label={t('Cplpv')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="3">
              <FormTextInput
                type="number"
                placeholder={t('Compc')}
                id="compc"
                name="compc"
                label={t('Compc')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="3">
              <FormTextInput
                type="number"
                placeholder={t('Compv')}
                id="compv"
                name="compv"
                label={t('Compv')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>

            <Col md="6">
              <FormTextInput
                type="number"
                placeholder={t('mediaCost')}
                id="mediaCost"
                name="media_cost"
                label={t('mediaCost')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
            <Col md="6">
              <FormTextInput
                type="number"
                placeholder={t('trackingCost')}
                id="trackingCost"
                name="tracking_cost"
                label={t('trackingCost')}
                isRequired={false}
                disabled={viewOnly}
              />
            </Col>
          </Row>
        </Col>
      </FormGroup>
    </>
  );
};

export default CostGroup;
