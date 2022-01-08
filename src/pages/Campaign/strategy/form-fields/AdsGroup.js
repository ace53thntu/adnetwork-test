//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Col, Row} from 'reactstrap';
import {FormTextInput} from 'components/forms';
import {Collapse} from 'components/common';

//---> Internal Modules
const AdsGroup = ({isView = false}) => {
  return (
    <Collapse initialOpen={true} title="Ads" unMount={false}>
      <Col sm={12}>
        <Row>
          <Col md={4}>
            <FormTextInput
              type="text"
              placeholder="Accepted layouts"
              id="accepted_layouts"
              name="accepted_layouts"
              label="Accepted layouts"
              isRequired={false}
              disabled={isView}
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
              disabled={isView}
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
              disabled={isView}
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
              disabled={isView}
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
              disabled={isView}
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
              disabled={isView}
            />
          </Col>
        </Row>
      </Col>
    </Collapse>
  );
};

export default AdsGroup;
