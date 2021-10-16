// import PropTypes from 'prop-types';
import * as React from 'react';

import {useDispatchSelectAdvertiser} from '../../hooks/useDispatchSelectAdvertiser';
import {CreativeBodyLayout} from '../CreativeLayout';
import ConceptForm from './ConceptForm';

function ConceptCreate(props) {
  useDispatchSelectAdvertiser();

  return (
    <CreativeBodyLayout heading="Create Concept">
      <ConceptForm />
    </CreativeBodyLayout>
  );
}

ConceptCreate.propTypes = {};
ConceptCreate.defaultProps = {};

export default ConceptCreate;
