//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Modal} from 'reactstrap';

const ModalLayout = ({modal = false, className = '', children}) => {
  return (
    <Modal isOpen={modal} className={className} size="lg">
      {children}
    </Modal>
  );
};

export default React.memo(ModalLayout);
