import React from 'react';

import PropTypes from 'prop-types';
import {CopyBlock, dracula} from 'react-code-blocks';
import BlockUi from 'react-block-ui';
import {Alert} from '@material-ui/lab';
import {Collapse} from '@material-ui/core';
import {useGetActivation} from 'queries/activation';
import {getRole} from 'utils/helpers/auth.helpers';

const EmbeddedScript = ({
  code = 'No script',
  language = 'text',
  showLineNumbers = false,
  roleRefId = 0
}) => {
  console.log('🚀 ~ file: EmbeddedScript.js ~ line 16 ~ roleRefId', roleRefId);
  const role = getRole();
  const [open, setOpen] = React.useState(true);

  const {data, isLoading, isFetched} = useGetActivation({
    params: {
      role_ref_uuid: roleRefId,
      role
    },
    enabled: !!roleRefId
  });
  const url = data?.url || '';

  return (
    <BlockUi tag="div" blocking={isLoading}>
      <div style={{minHeight: 100}}>
        {data?.msg && (
          <Collapse in={open}>
            <Alert
              className="mb-2"
              severity="error"
              onClose={() => {
                setOpen(false);
              }}
            >
              {data?.msg}
            </Alert>
          </Collapse>
        )}
        {isFetched && (
          <CopyBlock
            theme={dracula}
            text={url}
            language={language}
            showLineNumbers={showLineNumbers}
            wrapLines
            codeBlock
          />
        )}
      </div>
    </BlockUi>
  );
};

CopyBlock.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string,
  showLineNumbers: PropTypes.bool
};

export default EmbeddedScript;
