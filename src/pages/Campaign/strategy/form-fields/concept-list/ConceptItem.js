import React from 'react';

import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';
import {CustomInput, ListGroupItem} from 'reactstrap';

const propTypes = {
  conceptItem: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
  conceptIdx: PropTypes.number,
  isView: PropTypes.bool
};

const ConceptItem = ({conceptItem = {}, conceptIdx = 0, isView = false}) => {
  const {register} = useFormContext();

  return (
    <ListGroupItem>
      <div className="todo-indicator bg-success" />
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left flex2">
            {!isView ? (
              <CustomInput
                type="checkbox"
                label={conceptItem?.name}
                name={`concept_uuids[${conceptIdx}]`}
                id={`concept-${conceptItem?.id}`}
                innerRef={register()}
                value={conceptItem?.id}
              />
            ) : (
              conceptItem?.name
            )}
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
