//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {Controller, useFormContext} from 'react-hook-form';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import {ActiveToogle} from 'components/forms';

const BillingStatusGroup = ({viewOnly = false}) => {
  const {control} = useFormContext();

  const [isShow, setIsShow] = useState(true);

  const handleToggleGroup = useCallback(evt => {
    evt.preventDefault();
    setIsShow(prevState => !prevState);
  }, []);

  return (
    <>
      <FormGroup tag="fieldset" row className="border border-gray">
        <legend
          className="col-form-label col-sm-3 ml-3 w-150px c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />{' '}
          Billing Status
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="3">
              <Label className="mr-5">Use Campaign Billing</Label>
              <Controller
                control={control}
                name="use_campaign_billing"
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
              <Label className="mr-5">Ubiquity Exists</Label>
              <Controller
                control={control}
                name="ubiquity_exists"
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

export default BillingStatusGroup;
