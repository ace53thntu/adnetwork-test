import React from 'react';
import {Button} from 'reactstrap';

export default function ButtonGroup() {
  return (
    <div>
      <Button className="mb-2 mr-2 btn-shadow" color="primary">
        Sort by
      </Button>
      <Button className="mb-2 mr-2 btn-shadow" color="primary">
        Group by
      </Button>
      <Button className="mb-2 mr-2 btn-shadow" color="primary">
        Create
      </Button>
      <Button className="mb-2 mr-2 btn-shadow" color="primary">
        Compare
      </Button>
    </div>
  );
}
