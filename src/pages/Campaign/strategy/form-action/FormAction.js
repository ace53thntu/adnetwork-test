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

const propTypes = {
  isView: PropTypes.bool,
  isSummary: PropTypes.bool
};

const FormAction = ({isView = false, isSummary = false}) => {
  const {t} = useTranslation();
  const {gotoCampaignManagement} = useCampaignManager();
  const {
    formState: {isSubmitting, isDirty}
  } = useFormContext();

  return (
    <>
      {!isView && (
        <div className="d-block text-right mr-15">
          <Button
            onClick={gotoCampaignManagement}
            className="mr-2"
            color="link"
          >
            {t('cancel')}
          </Button>
          <ButtonLoading
            type="submit"
            className="btn-primary"
            loading={isSubmitting}
            disabled={!isDirty || isSubmitting}
          >
            {isSummary ? t('save') : t('saveAndNext')}
          </ButtonLoading>
        </div>
      )}
    </>
  );
};

FormAction.propTypes = propTypes;

export default React.memo(FormAction);
