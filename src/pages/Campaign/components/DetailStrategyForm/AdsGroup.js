//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {Col, FormGroup, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {FormTextInput} from 'components/forms';

//---> Internal Modules
const AdsGroup = ({viewOnly}) => {
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
          />
          <span className="mr-1">Ads</span>
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md={4}>
              <FormTextInput
                type="text"
                placeholder="Accepted layouts"
                id="accepted_layouts"
                name="accepted_layouts"
                label="Accepted layouts"
                isRequired={false}
              />
            </Col>
            <Col md={4}>
              <FormTextInput
                type="text"
                placeholder="Accepted adunits"
                id="accepted_adunits"
                name="accepted_adunits"
                label="Accepted adunits"
                isRequired={false}
              />
            </Col>
            <Col md={4}>
              <FormTextInput
                type="text"
                placeholder="Accepted contexts"
                id="accepted_contexts"
                name="accepted_contexts"
                label="Accepted contexts"
                isRequired={false}
              />
            </Col>
            <Col md={4}>
              <FormTextInput
                type="text"
                placeholder="Accepted sub contexts"
                id="accepted_sub_contexts"
                name="accepted_sub_contexts"
                label="Accepted sub contexts"
                isRequired={false}
              />
            </Col>
            <Col md={4}>
              <FormTextInput
                type="text"
                placeholder="Accepted placements"
                id="accepted_placements"
                name="accepted_placements"
                label="Accepted placements"
                isRequired={false}
              />
            </Col>
            <Col md={4}>
              <FormTextInput
                type="text"
                placeholder="0.0"
                id="view_rate_prediction"
                name="view_rate_prediction"
                label="View rate prediction"
                isRequired={false}
              />
            </Col>
          </Row>
        </Col>
      </FormGroup>
    </>
  );
};

export default AdsGroup;
