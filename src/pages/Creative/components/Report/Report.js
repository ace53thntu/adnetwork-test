// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';

// Internal Modules
import {Collapse} from 'components/common';
import {EntityReport} from 'pages/entity-report';
import {useGetAdvertiser} from 'queries/advertiser';

const propTypes = {
  entityId: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  ownerRole: PropTypes.string.isRequired
};

const Report = ({
  entityId = '',
  entity = '',
  ownerRole = '',
  entityName,
  groupObjectId
}) => {
  const {data} = useGetAdvertiser(groupObjectId, !!groupObjectId);
  return (
    <Collapse initialOpen={false} title="Reports" unMount={false}>
      <ReportBody
        entity={entity}
        entityId={entityId}
        ownerRole={ownerRole}
        entityName={entityName}
        parentPath={data?.name}
      />
    </Collapse>
  );
};

Report.propTypes = propTypes;

function ReportBody(props) {
  const {entity, entityId, ownerRole, entityName, parentPath} = props;
  return (
    <Row>
      <Col>
        <EntityReport
          entity={entity}
          entityId={entityId}
          ownerRole={ownerRole}
          entityName={entityName}
          parentPath={parentPath}
        />
      </Col>
    </Row>
  );
}

export default React.memo(Report);
