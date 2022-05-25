import { ErrorBoundary } from 'components/common';
import AppContent from 'components/layouts/Admin/components/AppContent';
//---> Internal Modules
//---> External Modules
import { useDebounce } from 'hooks/useDebounce';
//---> Build-in Modules
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import {
  searchContainersRedux,
  toggleCreateContainerModalRedux
} from 'store/reducers/container';

import { ContainerCreateModal } from '../ContainerCreate';

function ContainerLayout(props) {
  const reduxDispatch = useDispatch();
  const { t } = useTranslation();

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
      {/* <ExtendSidebar heading={<NavLink to="/container">Containers</NavLink>}>
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

          <ContainerCreateModal />
        </div>
        <div className="border mb-2">
          <ErrorBoundary>
            <ContainersTree />
          </ErrorBoundary>
        </div>
      </ExtendSidebar>*/}

      <ContainerCreateModal />

      <AppContent>
        <Outlet />
      </AppContent>
    </ErrorBoundary>
  );
}

ContainerLayout.propTypes = {};
ContainerLayout.defaultProps = {};

export default ContainerLayout;
