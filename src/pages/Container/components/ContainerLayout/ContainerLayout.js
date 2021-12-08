import {
  searchContainersRedux,
  toggleCreateContainerModalRedux
} from 'store/reducers/container';
import {useDebounce} from 'hooks/useDebounce';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router';
import {NavLink} from 'react-router-dom';
import {Button, Input} from 'reactstrap';

import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {ContainersTree} from '../Tree';
// import ContainerCreateDialog from '../ContainerCreateDialog';

function ContainerLayout(props) {
  const reduxDispatch = useDispatch();
  const {t} = useTranslation();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  const [keyword, setKeyword] = React.useState('');

  const debouncedKeyword = useDebounce(keyword, 500);

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
    <>
      <ExtendSidebar
        heading={<NavLink to="/container">Containers</NavLink>}
        classes="custom-sidebar"
      >
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
          {/* <ContainerCreateDialog /> */}
        </div>
        <div className="border mb-2">
          <ContainersTree />
        </div>
      </ExtendSidebar>

      <AppContent customClass="custom-right-content">
        <Outlet />
      </AppContent>
    </>
  );
}

ContainerLayout.propTypes = {};
ContainerLayout.defaultProps = {};

export default ContainerLayout;
