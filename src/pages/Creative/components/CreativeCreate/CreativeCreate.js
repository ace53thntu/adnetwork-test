import * as React from 'react';

import {CreativeDialog} from '../CreativeDialog';
import CreativeCreateBody from './CreativeCreateBody';

function CreativeCreate(props) {
  return (
    <CreativeDialog>
      <CreativeCreateBody />
    </CreativeDialog>
  );
}

CreativeCreate.propTypes = {};
CreativeCreate.defaultProps = {};

export default CreativeCreate;
