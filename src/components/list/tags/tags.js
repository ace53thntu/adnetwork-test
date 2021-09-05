import React from 'react';
import Chip from '@material-ui/core/Chip';

const TagsList = ({tagsList = []}) => {
  return (
    <>
      {tagsList?.map((tagItem, tagIdx) => {
        return (
          <Chip
            key={`pr-${tagIdx}`}
            className={tagIdx !== 0 ? 'ml-2' : ''}
            size="small"
            label={tagItem}
          />
        );
      })}
    </>
  );
};

export default TagsList;
