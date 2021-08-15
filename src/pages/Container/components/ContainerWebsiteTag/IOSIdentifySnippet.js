import {Label} from 'reactstrap';
import React from 'react';
import ReactPrismjs from '@uiw/react-prismjs';

function IOSIdentifySnippet({traits = []}) {
  let traitSnippet = '';

  traits.forEach((trait, index) => {
    traitSnippet += `"${trait?.value}": ""${
      index + 1 < traits.length ? ',' : ''
    }`;
  });

  return (
    <div>
      <Label>Snippet</Label>

      <ReactPrismjs
        language="javascript"
        source={`AicactusSDK.shared().identify([userId], traits: [${traitSnippet}])`}
        className=""
      />
    </div>
  );
}

export default IOSIdentifySnippet;
