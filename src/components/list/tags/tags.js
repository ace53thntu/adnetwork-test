import React from 'react';
import Chip from '@material-ui/core/Chip';
import styled from 'styled-components';

const ChipStyled = styled(Chip)`
  max-width: 100%;
`;

const TagsList = ({tagsList = []}) => {
  return (
    <>
      {tagsList?.map((tagItem, tagIdx) => {
        return (
          <ChipStyled
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
