import AppContent from 'components/layouts/Admin/components/AppContent';
//---> Internal Modules
import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
import {RoutePaths} from 'constants/route-paths';
//---> External Modules
import {useDebounce} from 'hooks/useDebounce';
//---> Build-in Modules
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Outlet} from 'react-router';
import {NavLink} from 'react-router-dom';
import {Input} from 'reactstrap';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {searchCampaignRedux} from 'store/reducers/campaign';

import {TreeSidebar} from '../sidebar-tree';

function CampaignPageLayout(props) {
  const reduxDispatch = useDispatch();
  const {t} = useTranslation();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  const [keyword, setKeyword] = React.useState('');

  const debouncedKeyword = useDebounce(keyword, 500);

  React.useEffect(() => {
    reduxDispatch(searchCampaignRedux(debouncedKeyword));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  const onHandleChangeSearch = evt => {
    setKeyword(evt.target.value);
  };

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ExtendSidebar
        heading={
          <NavLink to={`/${RoutePaths.CAMPAIGN}`}>
            {t('campaignManagement')}
          </NavLink>
        }
      >
        <div className="mb-2">
          <Input
            placeholder={`${t('search')}...`}
            onChange={onHandleChangeSearch}
            value={keyword}
          />
        </div>

        <div className="divider" />
        <div className="border mb-2">
          <TreeSidebar />
        </div>
      </ExtendSidebar>

      <AppContent>
        <Outlet />
      </AppContent>
    </React.Suspense>
  );
}

CampaignPageLayout.propTypes = {};
CampaignPageLayout.defaultProps = {};

export default CampaignPageLayout;
