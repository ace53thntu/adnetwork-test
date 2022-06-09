import { ApiError } from 'components/common';
import Historical from 'components/historical';
import { LogTypes } from 'constants/misc';
import { RoutePaths } from 'constants/route-paths';
import { formToApi } from 'entities/Campaign';
import PropTypes from 'prop-types';
import { useCreateCampaign, useEditCampaign } from 'queries/campaign';
import { GET_CAMPAIGN } from 'queries/campaign/constants';
//---> Build-in Modules
import React, { useCallback } from 'react';
//---> External Modules
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Container, Form } from 'reactstrap';
import { updateCampaignRedux } from 'store/reducers/campaign';
//---> Internal Modules
import { ShowToast } from 'utils/helpers/showToast.helpers';

import StatisticMetrics from '../components/StatisticMetrics';
import { EnumTypeStatistics } from '../components/StatisticMetrics/StatisticMetrics';
import { useRefreshAdvertiserTree } from '../hooks/useRefreshAdvertiserTree';
import BudgetGroup from './form-fields/BudgetGroup';
import DomainGroup from './form-fields/DomainGroup';
import ImpressionGroup from './form-fields/ImpressionGroup';
import InformationGroup from './form-fields/InformationGroup';
import KeywordGroup from './form-fields/KeywordGroup';
import { validationCampaign } from './validation';

const propTypes = {
  goToTab: PropTypes.func,
  isEdit: PropTypes.bool,
  isCreate: PropTypes.bool,
  isView: PropTypes.bool,
  currentCampaign: PropTypes.any
};

const CampaignForm = ({
  goToTab = () => null,
  isEdit = false,
  isCreate = false,
  isView = false,
  currentCampaign = null
}) => {
  const client = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refresh } = useRefreshAdvertiserTree();

  const { mutateAsync: createCampaign } = useCreateCampaign();
  const { mutateAsync: updateCampaign } = useEditCampaign(currentCampaign?.uuid);

  const { campaignId } = useParams();

  const methods = useForm({
    defaultValues: currentCampaign,
    resolver: validationCampaign(t, isEdit)
  });

  const { handleSubmit, control } = methods;
  const startDate = useWatch({ name: 'start_time', control });
  const [openModal, setOpenModal] = React.useState(false);
  console.log(
    '🚀 ~ file: ViewTabs.js ~ line 37 ~ CampaignViewTabs ~ openModal',
    openModal
  );

  const toggleModal = useCallback(() => {
    setOpenModal(prevState => !prevState);
  }, []);
  const onSubmit = useCallback(
    async formData => {
      const requestBody = formToApi(formData);

      if (isEdit) {
        try {
          const { data } = await updateCampaign({
            campId: campaignId,
            data: requestBody
          });
          await client.invalidateQueries([GET_CAMPAIGN, data?.uuid]);
          ShowToast.success('Updated Campaign successfully!');
          dispatch(updateCampaignRedux(data));
          navigate(`/${RoutePaths.CAMPAIGN}/${data?.uuid}`);
        } catch (error) {
          ShowToast.error(
            <ApiError apiError={error || 'Fail to update Campaign'} />
          );
        }
      } else {
        try {
          const { data } = await createCampaign(requestBody);

          navigate(
            `/${RoutePaths.CAMPAIGN}/${data?.uuid}?next_tab=strategies&advertiser_id=${data?.advertiser_uuid}`
          );
          await refresh(data?.advertiser_uuid, data?.uuid);

          ShowToast.success('Created Campaign successfully!');
        } catch (error) {
          ShowToast.error(
            <ApiError apiError={error || 'Fail to create Campaign'} />
          );
        }
      }
    },
    [
      campaignId,
      client,
      createCampaign,
      dispatch,
      isEdit,
      navigate,
      updateCampaign,
      refresh
    ]
  );

  return (
    <div>
      {/* {isView && (
        <div className="d-flex justify-content-end mb-2">
          <Button color="primary" type="button" onClick={toggleModal}>
            Logs
          </Button>
        </div>
      )} */}

      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Container fluid>
            {/* Campaign Statistic Metric */}
            {
              isView && <StatisticMetrics
                id={campaignId}
                reportType={EnumTypeStatistics.Campaign}
              />
            }

            {/* Information */}
            <InformationGroup
              isView={isView}
              isCreate={isCreate}
              currentCampaign={currentCampaign}
              startDate={startDate}
            />

            {isCreate && (
              <>
                {/* Budget */}
                <BudgetGroup />

                {/* Impression */}
                <ImpressionGroup />

                {/* Domain */}
                <DomainGroup />

                {/* Keyword */}
                <KeywordGroup />
              </>
            )}
          </Container>
          <div className="d-block text-right mr-15">
            {isEdit || isCreate ? (
              <>
                <Link to={`/${RoutePaths.CAMPAIGN}`}>
                  <Button className="mb-2 mr-2 btn-icon" color="link">
                    {t('cancel')}
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="mb-2 mr-2 btn-icon"
                  color="primary"
                >
                  <i className="pe-7s-upload btn-icon-wrapper"> </i>
                  {t('save')}
                </Button>
              </>
            ) : null}
            {isView && (
              <Link
                to={`/${RoutePaths.CAMPAIGN}/${currentCampaign?.uuid}/${RoutePaths.EDIT}?advertiser_id=${currentCampaign?.advertiser_uuid?.value}`}
              >
                <Button className="mb-2 mr-2 btn-icon" color="link">
                  {t('goToEdit')}
                </Button>
              </Link>
            )}
          </div>
        </Form>
      </FormProvider>
      {openModal && (
        <Historical
          modal={openModal}
          toggle={toggleModal}
          entityName={currentCampaign?.name}
          entityUuid={currentCampaign?.uuid}
          entityType={LogTypes.CAMPAIGN}
        />
      )}
    </div>
  );
};

CampaignForm.propTypes = propTypes;

export default CampaignForm;
