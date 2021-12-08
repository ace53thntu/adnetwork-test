//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Button} from 'reactstrap';

const ActionBar = ({onClickActivation = () => null}) => {
  const {t} = useTranslation();

  return (
    <div className="mb-2 d-flex justify-content-end">
      <Button color="primary" onClick={onClickActivation}>
        {t('activation')}
      </Button>
    </div>
  );
};

export default ActionBar;
