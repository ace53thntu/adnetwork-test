import React from 'react';

import Proptypes from 'prop-types';
import {useFormContext} from 'react-hook-form';
import {CustomInput, ListGroupItem} from 'reactstrap';

const propTypes = {
  conceptItem: Proptypes.oneOfType([Proptypes.any, Proptypes.object]),
  conceptIdx: Proptypes.number,
  isView: Proptypes.bool
};

const ConceptItem = ({conceptItem = {}, conceptIdx = 0, isView = false}) => {
  const {register} = useFormContext();

  return (
    <ListGroupItem>
      <div className="todo-indicator bg-success" />
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left flex2">
            <CustomInput
              type="checkbox"
              label={conceptItem?.name}
              name={`concept_ids[${conceptIdx}]`}
              id={`concept-${conceptItem?.id}`}
              innerRef={register()}
              value={conceptItem?.id}
              disabled={isView}
            />
          </div>
          <div className="widget-content-right ml-3">
            <div className="badge badge-pill badge-success">
              {conceptItem?.status}
            </div>
          </div>
        </div>
      </div>
    </ListGroupItem>
  );
};

ConceptItem.propTypes = propTypes;

export default React.memo(ConceptItem);
