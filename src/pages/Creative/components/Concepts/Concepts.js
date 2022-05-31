import * as React from 'react';

import {CreativeBodyLayout} from '../CreativeLayout';
import ConceptList from './ConceptList';

function Concepts(props) {
  return (
    <CreativeBodyLayout heading={`Concepts Management`}>
      <ConceptList />
    </CreativeBodyLayout>
  );
}

Concepts.propTypes = {};
Concepts.defaultProps = {};

export default Concepts;
