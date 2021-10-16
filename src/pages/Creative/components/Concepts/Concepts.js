// import PropTypes from 'prop-types';
import {useDispatchSelectAdvertiser} from 'pages/Creative/hooks/useDispatchSelectAdvertiser';
import * as React from 'react';

import {CreativeBodyLayout} from '../CreativeLayout';
import ConceptList from './ConceptList';

function Concepts(props) {
  useDispatchSelectAdvertiser();

  return (
    <CreativeBodyLayout heading="Concepts Management">
      <ConceptList />
    </CreativeBodyLayout>
  );
}

Concepts.propTypes = {};
Concepts.defaultProps = {};

export default Concepts;
