import React from 'react';

import PropTypes from 'prop-types';
import {Badge} from 'reactstrap';

const propTypes = {
  domains: PropTypes.array
};

const DomainBadge = ({domains = []}) => {
  if (!domains || domains?.length === 0) {
    return <></>;
  }

  return domains?.map(domain => (
    <Badge key={`pr-${domain?.uuid}`} color="info" className="mr-1">
      {domain?.domain}
    </Badge>
  ));
};

DomainBadge.propTypes = propTypes;

export default React.memo(DomainBadge);
