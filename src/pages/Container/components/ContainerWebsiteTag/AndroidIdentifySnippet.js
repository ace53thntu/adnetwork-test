import {Label} from 'reactstrap';
import React from 'react';
import ReactPrismjs from '@uiw/react-prismjs';
import {capitalize} from 'utils/helpers/string.helpers';

function AndroidIdentifySnippet({traits = []}) {
  let traitSnippet = '';

  traits.forEach(trait => {
    traitSnippet += `.put${capitalize(trait?.value)}("")`;
  });

  return (
    <div>
      <Label>Snippet</Label>

      <ReactPrismjs
        language="javascript"
        source={`AicactusSDK.shared().identify([userId], Traits()${traitSnippet})`}
        className=""
      />
    </div>
  );
}

export default AndroidIdentifySnippet;
