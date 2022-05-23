import {FormReactSelect, FormTextInput} from 'components/forms';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, FormGroup, Row} from 'reactstrap';

import {PLATFORM_OPTIONS} from '../BannerForm/constants';
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
          name="type"
          label="Type"
          defaultValue={defaultValues.type}
          options={VideoServeTypes}
        />
      </Col>
      <Col md={3}>
        <FormReactSelect
          placeholder=""
          name="linearity"
          label="Linearity"
          defaultValue={defaultValues.linearity}
          options={VideoTypes}
        />
      </Col>
      <Col md={3}>
        <FormReactSelect
          options={PLATFORM_OPTIONS}
          placeholder=""
          name="platform"
          label="Platform"
          defaultValue={defaultValues.platform}
        />
      </Col>
      <Col md={9}>
        <FormGroup>
          <FormCodeMirror
            name="video_metadata"
            label="Video metadata"
            extension="JSON"
            defaultValue={defaultValues.video_metadata}
          />
        </FormGroup>
      </Col>
    </Row>
  );
}

VideoInformationForm.propTypes = {
  defaultValues: PropTypes.any
};
VideoInformationForm.defaultProps = {};

export default VideoInformationForm;
