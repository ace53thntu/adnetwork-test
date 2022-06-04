import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Input} from 'reactstrap';

import ContainerCreateDialog from '../ContainerCreateDialog';
import ContainersTree from '../ContainerTree';

function ContainerSideBar() {
  const {t} = useTranslation();

  const containers = [];

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onHandleChangeSearch = () => {
    console.log('onHandleChangeSearch');
  };

  const onHandleOpenCreateDialog = useCallback(() => {
    setIsOpenDialog(!isOpenDialog);
  }, [isOpenDialog]);

  return (
    <ExtendSidebar heading={t('containers')}>
      <div className="mb-2">
        <Input
          placeholder={t('searchContainer')}
          onChange={onHandleChangeSearch}
        />
      </div>
      <div className="mb-2 text-right">
        <Button
          color="primary"
          className="btn-shadow"
          size="sm"
          onClick={onHandleOpenCreateDialog}
        >
          {t('createNew')}
        </Button>
        {isOpenDialog && (
          <ContainerCreateDialog
            isOpen={isOpenDialog}
            toggle={onHandleOpenCreateDialog}
            containers={containers}
          />
        )}
      </div>
      <div className="border mb-2">
        <ContainersTree containers={containers} />
      </div>
    </ExtendSidebar>
  );
}

export default ContainerSideBar;
