import React from 'react';

import PropTypes from 'prop-types';

import ConceptItem from './ConceptItem';
import {ListGroup} from 'reactstrap';

const propTypes = {
  concepts: PropTypes.array,
  isView: PropTypes.bool
};

const ConceptList = ({concepts = [], isView = false}) => {
  return (
    <ListGroup className="mb-3">
      {concepts?.map((conceptItem, conceptIdx) => {
        return (
          <ConceptItem
            key={`pr-${conceptItem?.uuid}`}
            conceptItem={conceptItem}
            conceptIdx={conceptIdx}
            isView={isView}
          />
        );
      })}
    </ListGroup>
  );
};

ConceptList.propTypes = propTypes;

export default ConceptList;
