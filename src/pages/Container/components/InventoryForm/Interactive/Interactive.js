import {Collapse} from 'components/common';
import React from 'react';
import InteractiveForm from './InteractiveForm';

const Interactive = () => {
  return (
    <div>
      <Collapse title="Interactive" initialOpen={false} unMount={false}>
        <InteractiveForm />
      </Collapse>
    </div>
  );
};

export default React.memo(Interactive);
