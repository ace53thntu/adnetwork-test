import {FormTextInput} from 'components/forms';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Row} from 'reactstrap';

function NativeAdInformationForm(props) {
  const {defaultValues, isLoading} = props;

  return (
    <>
      <Row>
        <Col md="4">
          <FormTextInput
            isRequired
            placeholder=""
            name="name"
            label="Name"
            disable={isLoading}
            defaultValue={defaultValues.name}
          />
        </Col>
        <Col md="4">
          <FormTextInput
            placeholder=""
            name="click_url"
            label="Click URL"
            disable={isLoading}
            defaultValue={defaultValues.click_url}
          />
        </Col>
        <Col md="4">
          <FormTextInput
            placeholder=""
            name="dco_product"
            label="DCO product"
            disable={isLoading}
            defaultValue={defaultValues.dco_product}
          />
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <FormTextInput
            placeholder=""
            name="product_query_string"
            label="Product query string"
            disable={isLoading}
            defaultValue={defaultValues.product_query_string}
          />
        </Col>
        <Col md="4">
          <FormTextInput
            placeholder=""
            name="extra_trackers"
            label="Extra trackers"
            disable={isLoading}
            defaultValue={defaultValues.extra_trackers}
          />
        </Col>
        {/* <Col md="4" className="d-flex align-items-center">
    <Forms.FormCheckbox
      name="active"
      text="Active"
      disabled={isLoading}
    />
  </Col> */}
      </Row>
    </>
  );
}

NativeAdInformationForm.propTypes = {
  defaultValues: PropTypes.any,
  isLoading: PropTypes.bool
};
NativeAdInformationForm.defaultProps = {
  defaultValues: null,
  isLoading: false
};

export default NativeAdInformationForm;
