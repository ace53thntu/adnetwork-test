import {ErrorBoundary} from 'components/common';
import AppContent from 'components/layouts/Admin/components/AppContent';
//---> Internal Modules
import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
//---> External Modules
import {useDebounce} from 'hooks/useDebounce';
//---> Build-in Modules
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router';
import {NavLink} from 'react-router-dom';
import {Button, Input} from 'reactstrap';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {
  searchContainersRedux,
  toggleCreateContainerModalRedux
} from 'store/reducers/container';

import {ContainerCreateModal} from '../ContainerCreate';
import {ContainersTree} from '../Tree';

function ContainerLayout(props) {
  const reduxDispatch = useDispatch();
  const {t} = useTranslation();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  const [keyword, setKeyword] = React.useState('');

  const debouncedKeyword = useDebounce(keyword, 1000);

  React.useEffect(() => {
    reduxDispatch(searchContainersRedux(debouncedKeyword));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  const onHandleOpenCreateDialog = () => {
    reduxDispatch(toggleCreateContainerModalRedux());
  };

  const onHandleChangeSearch = evt => {
    setKeyword(evt.target.value);
  };

  return (
    <ErrorBoundary>
      <ExtendSidebar heading={<NavLink to="/container">Containers</NavLink>}>
        <div className="mb-2">
          <Input
            placeholder="Search..."
            onChange={onHandleChangeSearch}
            value={keyword}
          />
        </div>

        <div className="divider" />
        <div className="mb-2 text-right">
          <Button
            color="primary"
            className="btn-shadow"
            size="sm"
            onClick={onHandleOpenCreateDialog}
          >
            {t('createNew')}
          </Button>

          {/* create container dialog will be here */}
          <ContainerCreateModal />
        </div>
        <div className="border mb-2">
          <ErrorBoundary>
            <ContainersTree />
          </ErrorBoundary>
        </div>
      </ExtendSidebar>

      <AppContent>
        <Outlet />
      </AppContent>
    </ErrorBoundary>
  );
}

ContainerLayout.propTypes = {};
ContainerLayout.defaultProps = {};

export default ContainerLayout;
