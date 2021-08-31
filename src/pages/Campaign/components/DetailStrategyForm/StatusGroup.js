//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {Controller, useFormContext} from 'react-hook-form';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import {ActiveToogle} from 'components/forms';

const StatusGroup = ({viewOnly}) => {
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
          className="col-form-label col-sm-2 ml-3 w-130px c-cursor-pointer"
          onClick={evt => handleToggleGroup(evt)}
        >
          <FontAwesomeIcon
            className="mr-1 c-font-12"
            icon={isShow ? faChevronUp : faChevronDown}
          />
          <span className="mr-1">Status</span>
        </legend>
        <Col sm={12}>
          <Row className={isShow ? '' : 'd-none'}>
            <Col md="3">
              <Label className="mr-5">Status</Label>
              <Controller
                control={control}
                name="active"
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
              <Label className="mr-5">Week PartsGmt</Label>
              <Controller
                control={control}
                name="week_parts_gmt"
                disabled={viewOnly}
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
              <Label className="mr-5">Only Unskippable</Label>
              <Controller
                control={control}
                name="only_unskippable"
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
              <Label className="mr-5">Only Skippable</Label>
              <Controller
                control={control}
                name="only_skippable"
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

export default StatusGroup;
