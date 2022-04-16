import {FormReactSelect, FormTextInput} from 'components/forms';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Row} from 'reactstrap';
import {VideoServeTypes, VideoTypes} from './constants';

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
          isRequired
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
          isRequired
        />
      </Col>
      <Col md={3}>
        <FormTextInput
          placeholder=""
          name="height"
          label="Height"
          defaultValue={defaultValues.height}
          isRequired
        />
      </Col>
      <Col md={3}>
        <FormReactSelect
          placeholder=""
          name="serve_type"
          label="Serve type"
          defaultValue={defaultValues.serve_type}
          options={VideoServeTypes}
        />
      </Col>
      <Col md={3}>
        <FormReactSelect
          placeholder=""
          name="video_type"
          label="Video type"
          defaultValue={defaultValues.video_type}
          options={VideoTypes}
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
