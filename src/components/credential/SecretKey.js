//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {CopyBlock, dracula} from 'react-code-blocks';
import {CSSTransition} from 'react-transition-group';

const propTypes = {
  secretKey: PropTypes.string
};

const SecretKey = ({secretKey = ''}) => {
  console.log(
    '🚀 ~ file: SecretKey.js ~ line 14 ~ SecretKey ~ secretKey',
    secretKey
  );
  return (
    <CSSTransition classNames="fade-in" timeout={300}>
      <div className="w-100 mt-2">
        <CopyBlock
          theme={dracula}
          text={secretKey || 'No key'}
          language="text"
          showLineNumbers={false}
          wrapLines
          codeBlock
        />
      </div>
    </CSSTransition>
  );
};

SecretKey.propTypes = propTypes;

export default React.memo(SecretKey);
