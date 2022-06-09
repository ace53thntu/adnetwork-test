// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';

// Internal Modules
import {ButtonLoading} from 'components/common';
import {useCampaignManager} from 'pages/Campaign/hooks';
import {useFormContext} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';

const propTypes = {
  isView: PropTypes.bool,
  isSummary: PropTypes.bool,
  currentStrategy: PropTypes.object
};

const FormAction = ({
  isView = false,
  isSummary = false,
  isCreate = false,
  currentStrategy = {}
}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {gotoCampaignManagement} = useCampaignManager();
  const {
    formState: {isSubmitting}
  } = useFormContext();

  function goToView() {
    navigate(
      `/${RoutePaths.CAMPAIGN}/${currentStrategy?.campaign_uuid?.value}/${RoutePaths.STRATEGY}/${currentStrategy?.uuid}?advertiser_id=${currentStrategy?.advertiser_uuid}&next_tab=description`
    );
  }

  return (
    <>
      {!isView && (
        <div className="d-block text-right mr-15">
          <hr />

          <Button
            onClick={gotoCampaignManagement}
            className="mr-2"
            color="link"
            type="button"
          >
            {t('cancel')}
          </Button>
          {/*{!isCreate && (
            <Button
              onClick={goToView}
              className="mr-2"
              color="link"
              type="button"
            >
              {t('goToView')}
            </Button>
          )}*/}

          <ButtonLoading
            type="submit"
            className="btn-primary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSummary ? t('finish') : t('saveAndNext')}
          </ButtonLoading>
        </div>
      )}
    </>
  );
};

FormAction.propTypes = propTypes;

export default React.memo(FormAction);
