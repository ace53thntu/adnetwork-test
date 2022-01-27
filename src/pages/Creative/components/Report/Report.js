// Internal Modules
import {Collapse} from 'components/common';
import {EntityReport} from 'pages/entity-report';
// External Modules
import PropTypes from 'prop-types';
// Build-in Modules
import React from 'react';
import {Col, Row} from 'reactstrap';

const propTypes = {
  entityId: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  ownerRole: PropTypes.string.isRequired
};

const Report = ({entityId = '', entity = '', ownerId = '', ownerRole = ''}) => {
  return (
    <Collapse initialOpen={true} title="Reports" unMount={false}>
      <ReportBody
        entity={entity}
        entityId={entityId}
        ownerId={ownerId}
        ownerRole={ownerRole}
      />
    </Collapse>
  );
};

Report.propTypes = propTypes;

function ReportBody(props) {
  const {entity, entityId, ownerId, ownerRole} = props;
  return (
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
  );
}

export default React.memo(Report);
