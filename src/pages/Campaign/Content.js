import React, {Fragment, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import AddCampaign from './AddCampaign';
import EditCampaign from './EditCampaign';
import ManagerCampaign from './ManagerCampaign';
import StrategyCampaign from './Strategy';
import AddStrategy from './strategy.add';
import EditStrategy from './strategy.edit';
import ViewStrategy from './strategy.view';
import CampaignTree from './CampaignTree';
import {CAMPAIGN_VIEWS} from './constants';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';

const Campaign = () => {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  // const {selectedCampaign, selectedStrategy, view} = useSelector(
  //   state => state.campReducer
  // );
  useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(true));
  }, [reduxDispatch]);

  // const {data: advertisersResp = []} = useGetAdvertisers();
  const advertisersResp = [];

  // useEffect(() => {
  //   if (view === CAMPAIGN_VIEWS.advertiserDetail) {
  //     navigate(`/campaigns`);
  //   } else if (view === CAMPAIGN_VIEWS.campaignDetail) {
  //     navigate(`/campaigns/${selectedCampaign}`);
  //   } else if (view === CAMPAIGN_VIEWS.strategyDetail) {
  //     navigate(`/campaigns/${selectedCampaign}/strategy/${selectedStrategy}`);
  //   }
  // }, [navigate, selectedCampaign, selectedStrategy, view]);

  return (
    <Fragment>
      <CampaignTree listAdvertisers={advertisersResp} />
      <AppContent customClass="custom-right-content">
        <Routes>
          {/* Campaign */}
          <Route path="/">
            <ManagerCampaign listAdvertisers={advertisersResp} />
          </Route>
          <Route path="/create-campaign">
            <AddCampaign />
          </Route>
          <Route path="/:id">
            <EditCampaign isView={true} />
          </Route>
          <Route path="/:id/edit">
            <EditCampaign isEdit={true} />
          </Route>

          {/* Strategy */}
          <Route path="/:campId/strategy" element={<StrategyCampaign />}>
            <Route path="/:id" element={<ViewStrategy />} />
            <Route path="/:id/edit" element={<EditStrategy />} />
            <Route path="/create" element={<AddStrategy />} />
          </Route>
        </Routes>
      </AppContent>
    </Fragment>
  );
};

export default Campaign;
