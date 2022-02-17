import React from 'react';

import PropTypes from 'prop-types';

import ConceptItem from './ConceptItem';
import {ListGroup} from 'reactstrap';

const propTypes = {
  concepts: PropTypes.array,
  isView: PropTypes.bool
};

const ConceptList = ({
  concepts = [],
  isView = false,
  conceptsSelected = []
}) => {
  return (
    <ListGroup className="mb-3">
      {concepts?.map((conceptItem, conceptIdx) => {
        return (
          <ConceptItem
            key={`pr-${conceptItem?.uuid}`}
            conceptItem={conceptItem}
            conceptIdx={conceptIdx}
            isView={isView}
            defaultValue={
              conceptsSelected?.find(
                conceptSelected => conceptSelected?.uuid === conceptItem?.uuid
              )?.uuid || ''
            }
          />
        );
      })}
    </ListGroup>
  );
};

ConceptList.propTypes = propTypes;

export default ConceptList;
