import {Label} from 'reactstrap';
import React from 'react';
import ReactPrismjs from '@uiw/react-prismjs';
import {capitalize} from 'utils/helpers/string.helpers';

function AndroidTrackSnippet({eventName, properties}) {
  let propSnippet = '';

  properties.forEach(property => {
    propSnippet += `.put${capitalize(property.propertyName)}("")`;
  });

  return (
    <div>
      <Label>Snippet</Label>

      <ReactPrismjs
        language="javascript"
        source={`AicactusSDK.with(this).track(${eventName}, Properties()${propSnippet})`}
        className=""
      />
    </div>
  );
}

export default AndroidTrackSnippet;
