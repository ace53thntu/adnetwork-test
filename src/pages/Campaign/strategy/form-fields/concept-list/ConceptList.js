import React from 'react';

import PropTypes from 'prop-types';

import ConceptItem from './ConceptItem';
import {ListGroup} from 'reactstrap';
import {Button} from 'antd';

const propTypes = {
  concepts: PropTypes.array,
  isView: PropTypes.bool,
  onEdit: PropTypes.func
};

const ConceptList = ({
  concepts = [],
  isEdit = false,
  conceptsSelected = [],
  onEdit
}) => {
  return (
    <ListGroup className="mb-3">
      {concepts?.map((conceptItem, conceptIdx) => {
        return (
          <ConceptItem
            key={`pr-${conceptItem?.uuid}`}
            conceptItem={conceptItem}
            conceptIdx={conceptIdx}
            isEdit={isEdit}
            defaultValue={
              conceptsSelected?.find(
                conceptSelected => conceptSelected?.uuid === conceptItem?.uuid
              )?.uuid || ''
            }
          />
        );
      })}
      <Button type="primary" onClick={() => onEdit(!isEdit)}>
        {!isEdit ? 'Edit' : 'View'}
      </Button>
    </ListGroup>
  );
};

ConceptList.propTypes = propTypes;

export default ConceptList;
