//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Button} from 'reactstrap';

const ActionFooter = ({onClickCreateReport = () => null}) => {
  return (
    <div className="report-action mb-5 d-flex justify-content-end">
      <Button color="primary" type="button" onClick={onClickCreateReport}>
        Create Report Page
      </Button>
    </div>
  );
};

export default ActionFooter;
