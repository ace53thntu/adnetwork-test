import PropTypes from 'prop-types';
import * as React from 'react';
import {Card, CardBody, Col} from 'reactstrap';

import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function NotFound(props) {
  const {entity, onClick} = props;

  return (
    <Col>
      <Card className="card-shadow-primary border mb-3" outline color="primary">
        <CardBody>
          <div>
            {entity} empty, click
            <IconButton color={'default'} onClick={() => onClick(null)}>
              <CloudUploadIcon />
            </IconButton>
            to add new one
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

NotFound.propTypes = {
  entity: PropTypes.string,
  onClick: PropTypes.func
};
NotFound.defaultProps = {
  onClick: () => {}
};

export default NotFound;
