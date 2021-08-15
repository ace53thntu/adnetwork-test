import {Label} from 'reactstrap';
import React from 'react';
import ReactPrismjs from '@uiw/react-prismjs';

function IOSTrackSnippet({eventName, properties}) {
  const propSnippet = properties.map(property => {
    return `"${property.propertyName}": ""`;
  });

  return (
    <div>
      <Label>Snippet</Label>

      <ReactPrismjs
        language="javascript"
        source={`AicactusSDK.shared().track(${eventName}, properties: [${propSnippet}])`}
        className=""
      />
    </div>
  );
}

export default IOSTrackSnippet;
