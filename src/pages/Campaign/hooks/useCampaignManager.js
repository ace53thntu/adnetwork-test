import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

const useCampaignManager = () => {
  const navigate = useNavigate();

  const goTo = useCallback(
    ({id}) => {
      navigate(`./${id}`);
    },
    [navigate]
  );

  const goToCreate = useCallback(() => {
    navigate('./create-campaign');
  }, [navigate]);

  const gotoCreateStrategy = useCallback(
    (data = undefined) => {
      if (!data) {
        data = undefined;
      }
      navigate(`../${data}/strategy/create`, {state: data});
    },
    [navigate]
  );

  const gotoCampaignManagement = useCallback(() => {
    navigate('/campaigns');
  }, [navigate]);

  const goToViewStrategy = useCallback(
    ({campaignId, id}) => {
      navigate(`/campaigns/${campaignId}/strategy/${id}`);
    },
    [navigate]
  );

  const goToEditStrategy = useCallback(
    ({campaignId, id}) => {
      navigate(`/campaigns/${campaignId}/strategy/${id}/edit`);
    },
    [navigate]
  );

  const goToEditCampaign = useCallback(
    id => {
      navigate(`${id}`);
    },
    [navigate]
  );

  return {
    goTo,
    goToCreate,
    gotoCreateStrategy,
    gotoCampaignManagement,
    goToViewStrategy,
    goToEditStrategy,
    goToEditCampaign
  };
};

export {useCampaignManager};
