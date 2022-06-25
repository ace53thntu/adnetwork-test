import {ApiError, DialogConfirm} from 'components/common';
import Historical from 'components/historical';
import {
  CappingReferenceTypes,
  CappingTypes,
  DEFAULT_PAGINATION,
  DEFAULT_TIMEZONE,
  IS_RESPONSE_ALL,
  LogTypes
} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';
import {formToApi} from 'entities/Campaign';
import {formToApi as formCappingToApi} from '../components/capping/dto';

import PropTypes from 'prop-types';
import {useCreateCampaign, useEditCampaign} from 'queries/campaign';
import {GET_CAMPAIGN} from 'queries/campaign/constants';
//---> Build-in Modules
import React, {useCallback} from 'react';
//---> External Modules
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Button, Container, Form} from 'reactstrap';
import {updateCampaignRedux} from 'store/reducers/campaign';
//---> Internal Modules
import {ShowToast} from 'utils/helpers/showToast.helpers';

import StatisticMetrics from '../components/StatisticMetrics';
import {EnumTypeStatistics} from '../components/StatisticMetrics/StatisticMetrics';
import {useRefreshAdvertiserTree} from '../hooks/useRefreshAdvertiserTree';
import BudgetGroup from './form-fields/BudgetGroup';
import DomainGroup from './form-fields/DomainGroup';
import ImpressionGroup from './form-fields/ImpressionGroup';
import InformationGroup from './form-fields/InformationGroup';
import KeywordGroup from './form-fields/KeywordGroup';
import {validationCampaign} from './validation';
import BudgetList from '../components/capping/list/BudgetList';
import {getResponseData} from '../../../utils/helpers/misc.helpers';
import {getListByType} from '../components/capping/dto';
import {
  useDeleteCapping,
  useEditCapping,
  useGetCappings
} from '../../../queries/capping';
import CappingFormContainer from '../components/capping/form/CappingFormContainer';
import {TimezoneMapping} from 'utils/helpers/getListTimezone';

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
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {refresh} = useRefreshAdvertiserTree();

  const {mutateAsync: editCapping} = useEditCapping();
  const {mutateAsync: deleteCapping} = useDeleteCapping();
  const {mutateAsync: createCampaign} = useCreateCampaign();
  const {mutateAsync: updateCampaign} = useEditCampaign(currentCampaign?.uuid);

  const {campaignId} = useParams();

  const methods = useForm({
    defaultValues: currentCampaign,
    resolver: validationCampaign(t, isEdit)
  });
  let timeZone = '';
  if (
    currentCampaign?.time_zone?.value === null ||
    currentCampaign?.time_zone?.value === undefined ||
    currentCampaign?.time_zone?.value === ''
  ) {
    timeZone = TimezoneMapping[`${DEFAULT_TIMEZONE}`];
  } else {
    timeZone =
      TimezoneMapping[`${parseInt(currentCampaign?.time_zone?.value)}`];
  }
  console.log(
    '🚀 ~ file: form.js ~ line 94 ~ timeZone',
    timeZone,
    currentCampaign?.time_zone?.value
  );

  const {handleSubmit, control} = methods;
  const startDate = useWatch({name: 'start_time', control});
  const [openModal, setOpenModal] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [activeCapping, setActiveCapping] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const referenceUuid = currentCampaign?.uuid;
  const {data} = useGetCappings({
    params: {
      per_page: 100,
      page: DEFAULT_PAGINATION.page,
      sort: 'created_at DESC',
      reference_uuid: referenceUuid
    },
    enabled: !!referenceUuid
  });

  const toggleModal = useCallback(() => {
    setOpenModal(prevState => !prevState);
  }, []);
  const onSubmit = useCallback(
    async formData => {
      const requestBody = formToApi(formData, isCreate);

      if (isEdit) {
        try {
          const {data} = await updateCampaign({
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
          const {data} = await createCampaign(requestBody);

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
      isCreate,
      isEdit,
      updateCampaign,
      campaignId,
      client,
      dispatch,
      navigate,
      createCampaign,
      refresh
    ]
  );

  const cappings = React.useMemo(() => {
    const cappingData = getResponseData(data, IS_RESPONSE_ALL);

    return cappingData?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  const budgetList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.BUDGET.value});
  }, [cappings]);

  const impressionList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.IMPRESSION.value});
  }, [cappings]);

  function toggleCappingModal() {
    setOpenForm(prevState => !prevState);
  }

  function onClickMenu(index, item) {
    setActiveCapping(item);
    if (index === 0) {
      setOpenForm(true);
    } else if (index === 1) {
      setOpenDialog(true);
    }
  }

  function onClickItem(item) {
    setActiveCapping(item);
    setOpenForm(true);
  }
  function onCancelDelete() {
    setOpenDialog(false);
  }

  async function onEditCapping(formData) {
    const requestBody = formCappingToApi({formData, type: activeCapping?.type});
    console.log(
      '🚀 ~ file: form.js ~ line 192 ~ onEditCapping ~ requestBody',
      requestBody
    );
    setIsSubmitting(true);
    try {
      await editCapping({cappingId: activeCapping?.uuid, data: requestBody});
      setIsSubmitting(false);

      ShowToast.success('Updated capping successfully');
      toggleCappingModal();
      setActiveCapping(null);
    } catch (err) {
      setIsSubmitting(false);

      ShowToast.error(<ApiError apiError={err || 'Fail to update capping'} />);
    }
  }

  async function onSubmitDelete() {
    setIsSubmitting(true);

    try {
      if (
        activeCapping?.type !== CappingTypes.BUDGET.value &&
        activeCapping?.type !== CappingTypes.IMPRESSION.value
      ) {
        await deleteCapping({cappingId: activeCapping?.uuid});
      } else {
        await editCapping({cappingId: activeCapping?.uuid, data: {target: 0}});
      }

      setIsSubmitting(false);

      ShowToast.success('Deleted capping successfully');
      setOpenDialog(false);
      setActiveCapping(null);
    } catch (err) {
      setIsSubmitting(false);

      ShowToast.error(<ApiError apiError={err || 'Fail to delete capping'} />);
    }
  }

  return (
    <div>
      {isView && (
        <div className="d-flex justify-content-end mb-2">
          <Button color="primary" type="button" onClick={toggleModal}>
            Logs
          </Button>
        </div>
      )}

      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Container fluid>
            {/* Campaign Statistic Metric */}
            {isView && (
              <StatisticMetrics
                id={campaignId}
                reportType={EnumTypeStatistics.Campaign}
                timeZone={timeZone}
              />
            )}

            {/* Information */}
            <InformationGroup
              isView={isView}
              isCreate={isCreate}
              currentCampaign={currentCampaign}
              startDate={startDate}
            />

            {/* Capping List */}

            {budgetList?.length > 0 && (
              <BudgetList
                list={budgetList}
                onClickMenu={onClickMenu}
                onClickItem={onClickItem}
                referenceType={CappingReferenceTypes.CAMPAIGN}
                referenceUuid={referenceUuid}
              />
            )}

            {impressionList?.length > 0 && (
              <BudgetList
                title="Impression"
                list={impressionList}
                onClickMenu={onClickMenu}
                onClickItem={onClickItem}
                referenceType={CappingReferenceTypes.CAMPAIGN}
                referenceUuid={referenceUuid}
              />
            )}

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

      {/* Capping Form */}
      {openForm && (
        <CappingFormContainer
          cappingId={activeCapping?.uuid}
          onSubmit={onEditCapping}
          isSubmitting={isSubmitting}
          openForm={openForm}
          toggleModal={toggleCappingModal}
        />
      )}

      {openDialog && (
        <DialogConfirm
          open={openDialog}
          title="Are you sure delete this capping?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isSubmitting}
        />
      )}

      {openModal && (
        <Historical
          modal={openModal}
          toggle={toggleModal}
          entityName={currentCampaign?.name}
          entityUuid={currentCampaign?.uuid}
          entityType={LogTypes.CAMPAIGN}
          hasCapping
        />
      )}
    </div>
  );
};

CampaignForm.propTypes = propTypes;

export default CampaignForm;
