//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Controller, useFormContext} from 'react-hook-form';
import {Col, Label, Row} from 'reactstrap';

//---> Internal Modules
import {ActiveToogle} from 'components/forms';
import {Collapse} from 'components/common';

const StatusGroup = ({isView = false}) => {
  const {control} = useFormContext();

  return (
    <Collapse initialOpen={true} title="Status" unMount={false}>
      <Col sm={12}>
        <Row>
          <Col md="3">
            <Label className="mr-5">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({onChange, onBlur, value, name}) => (
                <ActiveToogle
                  value={value}
                  onChange={onChange}
                  disabled={isView}
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
                  disabled={isView}
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
                  disabled={isView}
                />
              )}
            />
          </Col>
        </Row>
      </Col>
    </Collapse>
  );
};

export default StatusGroup;
