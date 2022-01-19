// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';

// Internal Modules
import {Collapse} from 'components/common';
import {EntityReport} from 'pages/entity-report';

const propTypes = {
  entityId: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  ownerRole: PropTypes.string.isRequired
};

const Report = ({entityId = '', entity = '', ownerId = '', ownerRole = ''}) => {
  return (
    <Collapse initialOpen={true} title="Reports" unMount={false}>
      <Row>
        <Col>
          <EntityReport
            entity={entity}
            entityId={entityId}
            ownerId={ownerId}
            ownerRole={ownerRole}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

Report.propTypes = propTypes;

export default React.memo(Report);
