import PropTypes from 'prop-types';
import * as React from 'react';
import {Label} from 'reactstrap';

import ReactPrismjs from '@uiw/react-prismjs';
import {capitalize} from 'utils/helpers/string.helpers';
import {SDK_NAME} from 'constants/container';

function AndroidIdentifySnippet(props) {
  const {traits} = props;
  let traitSnippet = '';

  traits.forEach(trait => {
    traitSnippet += `.put${capitalize(trait?.value)}("")`;
  });

  return (
    <div>
      <Label>Snippet</Label>

      <ReactPrismjs
        language="javascript"
        source={`${SDK_NAME}.shared().identify([userId], Traits()${traitSnippet})`}
        className=""
      />
    </div>
  );
}

AndroidIdentifySnippet.propTypes = {
  traits: PropTypes.array
};
AndroidIdentifySnippet.defaultProps = {
  traits: []
};

export default AndroidIdentifySnippet;
