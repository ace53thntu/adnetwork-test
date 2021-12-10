import PropTypes from 'prop-types';
import * as React from 'react';
import {Label} from 'reactstrap';

import ReactPrismjs from '@uiw/react-prismjs';
import {capitalize} from 'utils/helpers/string.helpers';
import {SDK_NAME} from 'constants/container';

function AndroidTrackSnippet(props) {
  const {properties, eventName} = props;

  let propSnippet = '';

  properties.forEach(property => {
    propSnippet += `.put${capitalize(property.propertyName)}("")`;
  });

  return (
    <div>
      <Label>Snippet</Label>

      <ReactPrismjs
        language="javascript"
        source={`${SDK_NAME}.with(this).track(${eventName}, Properties()${propSnippet})`}
        className=""
      />
    </div>
  );
}

AndroidTrackSnippet.propTypes = {
  properties: PropTypes.array,
  eventName: PropTypes.string
};
AndroidTrackSnippet.defaultProps = {
  properties: [],
  eventName: ''
};

export default AndroidTrackSnippet;
