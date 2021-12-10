import PropTypes from 'prop-types';
import * as React from 'react';
import {Label} from 'reactstrap';

import ReactPrismjs from '@uiw/react-prismjs';
import {SDK_NAME} from 'constants/container';

function IosIdentifySnippet(props) {
  const {traits} = props;

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
        source={`${SDK_NAME}.shared().identify([userId], traits: [${traitSnippet}])`}
        className=""
      />
    </div>
  );
}

IosIdentifySnippet.propTypes = {
  traits: PropTypes.array
};
IosIdentifySnippet.defaultProps = {
  traits: []
};

export default IosIdentifySnippet;
