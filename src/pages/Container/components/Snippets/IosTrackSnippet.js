import PropTypes from 'prop-types';
import * as React from 'react';
import {Label} from 'reactstrap';

import ReactPrismjs from '@uiw/react-prismjs';
import {SDK_NAME} from 'constants/container';

function IosTrackSnippet(props) {
  const {properties, eventName} = props;

  const propSnippet = properties.map(property => {
    return `"${property.propertyName}": ""`;
  });

  return (
    <div>
      <Label>Snippet</Label>

      <ReactPrismjs
        language="javascript"
        source={`${SDK_NAME}.shared().track(${eventName}, properties: [${propSnippet}])`}
        className=""
      />
    </div>
  );
}

IosTrackSnippet.propTypes = {
  properties: PropTypes.array,
  eventName: PropTypes.string
};
IosTrackSnippet.defaultProps = {
  properties: [],
  eventName: ''
};

export default IosTrackSnippet;
