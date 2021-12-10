import {FormTextInput} from 'components/forms';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Row} from 'reactstrap';

function VideoInformationForm(props) {
  const {defaultValues} = props;

  return (
    <Row>
      <Col md={3}>
        <FormTextInput
          isRequired
          placeholder=""
          name="name"
          label="Name"
          defaultValue={defaultValues.name}
        />
      </Col>
      <Col md={3}>
        <FormTextInput
          placeholder=""
          name="click_url"
          label="Click URL"
          defaultValue={defaultValues.click_url}
        />
      </Col>
      <Col md={3}>
        <FormTextInput
          placeholder=""
          name="width"
          label="Width"
          defaultValue={defaultValues.width}
        />
      </Col>
      <Col md={3}>
        <FormTextInput
          placeholder=""
          name="height"
          label="Height"
          defaultValue={defaultValues.height}
        />
      </Col>
    </Row>
  );
}

VideoInformationForm.propTypes = {
  defaultValues: PropTypes.any
};
VideoInformationForm.defaultProps = {};

export default VideoInformationForm;
