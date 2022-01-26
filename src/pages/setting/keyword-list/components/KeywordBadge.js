import React from 'react';

import PropTypes from 'prop-types';
import {Badge} from 'reactstrap';

const propTypes = {
  keywords: PropTypes.array
};

const KeywordBadge = ({keywords = []}) => {
  if (!keywords || keywords?.length === 0) {
    return <></>;
  }

  return keywords?.map((keyword, idx) => (
    <Badge key={`pr-${idx}`} color="info" className="mr-1" pill>
      {keyword}
    </Badge>
  ));
};

KeywordBadge.propTypes = propTypes;

export default React.memo(KeywordBadge);
