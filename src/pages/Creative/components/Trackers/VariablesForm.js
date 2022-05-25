import {FormTextInput} from 'components/forms';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Row} from 'reactstrap';
import {capitalize} from 'utils/helpers/string.helpers';

function VariablesForm(props) {
  const {variables} = props;

  return (
    <Row>
      {Object.keys(variables).length
        ? Object.keys(variables).map((variableKey, index) => {
            return (
              <Col key={`${variableKey}-${index}`} md={4}>
                <FormTextInput
                  name={variableKey}
                  label={getLabelByVariableKey(variableKey)}
                  defaultValue={variables?.[variableKey] ?? ''}
                />
              </Col>
            );
          })
        : null}
    </Row>
  );
}

VariablesForm.propTypes = {
  variables: PropTypes.object
};
VariablesForm.defaultProps = {};

export default VariablesForm;

function getLabelByVariableKey(variable) {
  return variable.split('_').map(capitalize).join(' ');
}
