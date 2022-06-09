import React from 'react';

import PropTypes from 'prop-types';

import ConceptItem from './ConceptItem';
import { ListGroup } from 'reactstrap';
import { Button } from 'antd';
import './styles.scss';
import SearchInput from './components/SearchInput';

const propTypes = {
  concepts: PropTypes.array,
  isView: PropTypes.bool,
  onEdit: PropTypes.func
};
const ConceptList = ({
  concepts = [],
  isEdit = false,
  conceptsSelected = [],
  onEdit,
  setSearchTerm
}) => {
  return (
    <div className="concept-wrapper">
      <div className="concept-search">
        <div>{isEdit && <SearchInput setSearchTerm={setSearchTerm} />}</div>
        <Button
          className="concept-button"
          type="primary"
          onClick={() => onEdit(!isEdit)}
        >
          {!isEdit ? 'Edit' : 'View'}
        </Button>
      </div>
      <ListGroup className="mb-3 concept-list-wrapper">
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
      </ListGroup>
    </div>
  );
};

ConceptList.propTypes = propTypes;

export default ConceptList;
