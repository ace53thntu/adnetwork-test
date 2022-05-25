import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
// import BlockUi from 'react-block-ui';

// redux actions

// layouts

// components
import ContainersTree from '../ContainerTree';
import ContainerCreateDialog from '../ContainerCreateDialog';

// import {getPartnerId} from 'core/utils/auth';
// import {useContainers} from 'pages/Container/hooks/useContainers';
import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';

function ContainerSideBar() {
  const { t } = useTranslation();
  // const partnerId = getPartnerId();

  // const {data: containers} = useContainers({partnerId});
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
