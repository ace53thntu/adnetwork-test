import {FormReactSelect, FormTagsInput, FormTextInput} from 'components/forms';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, FormGroup, Row} from 'reactstrap';

import {
  AD_SIZE_FORMAT_OPTIONS,
  PLATFORM_OPTIONS,
  THIRD_PARTY_TAG_TYPES
} from '../BannerForm/constants';
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
          isClearable
          options={AD_SIZE_FORMAT_OPTIONS}
          placeholder=""
          name="ad_size_format"
          label="Ad size format"
          defaultValue={defaultValues.ad_size_format}
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
          options={PLATFORM_OPTIONS}
          placeholder=""
          name="platform"
          label="Platform"
          defaultValue={defaultValues.platform}
        />
      </Col>
      <Col md={6}>
        <FormTagsInput
          name="tags"
          label="Tags"
          placeholder="Enter tags..."
          defaultValue={defaultValues?.tags}
        />
      </Col>

      <Col md={6}>
        <FormGroup>
          <FormCodeMirror
            name="video_metadata"
            label="Video metadata"
            extension="JSON"
            defaultValue={defaultValues.video_metadata}
          />
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormReactSelect
          options={THIRD_PARTY_TAG_TYPES}
          placeholder=""
          name="third_party_tag_type"
          label="Third party tag type"
          defaultValue={defaultValues.third_party_tag_type}
        />
      </Col>
      <Col md="12">
        <FormTextInput
          type="textarea"
          placeholder=""
          name="third_party_tag"
          label="Third party tag"
          rows={4}
          defaultValue={defaultValues.third_party_tag}
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
