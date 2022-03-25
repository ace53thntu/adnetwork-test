//---> Build-in Modules
import React, {useCallback} from 'react';

//---> External Modules
import {useForm, FormProvider, useWatch} from 'react-hook-form';
import {Container, Form, Button} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {useQueryClient} from 'react-query';

//---> Internal Modules
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateCampaign, useEditCampaign} from 'queries/campaign';
import {validationCampaign} from './validation';
import {RoutePaths} from 'constants/route-paths';
import {formToApi} from 'entities/Campaign';
import {GET_CAMPAIGN} from 'queries/campaign/constants';
import InformationGroup from './form-fields/InformationGroup';
import BudgetGroup from './form-fields/BudgetGroup';
import ImpressionGroup from './form-fields/ImpressionGroup';
import KeywordGroup from './form-fields/KeywordGroup';
import DomainGroup from './form-fields/DomainGroup';
import {updateCampaignRedux} from 'store/reducers/campaign';

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

  const {mutateAsync: createCampaign} = useCreateCampaign();
  const {mutateAsync: updateCampaign} = useEditCampaign(currentCampaign?.uuid);

  const {campaignId} = useParams();

  const methods = useForm({
    defaultValues: currentCampaign,
    resolver: validationCampaign(t, isEdit)
  });

  const {handleSubmit, control} = methods;
  const startDate = useWatch({name: 'start_time', control});

  const onSubmit = useCallback(
    async formData => {
      const requestBody = formToApi(formData);

      if (isEdit) {
        try {
          const {data} = await updateCampaign({
            campId: campaignId,
            data: requestBody
          });
          // reset();
          await client.invalidateQueries([GET_CAMPAIGN, data?.uuid]);
          ShowToast.success('Updated Campaign successfully!');
          dispatch(updateCampaignRedux(data));
          // navigate(
          //   `/${RoutePaths.CAMPAIGN}/${data?.uuid}?next_tab=description&advertiser_id=${data?.advertiser_uuid}`
          // );
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to update Campaign');
        }
      } else {
        try {
          const {data} = await createCampaign(requestBody);
          navigate(
            `/${RoutePaths.CAMPAIGN}/${data?.uuid}?next_tab=strategies&advertiser_id=${data?.advertiser_uuid}`
          );

          ShowToast.success('Created Campaign successfully!');
        } catch (error) {
          ShowToast.error(error?.msg || 'Fail to create Campaign');
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
      updateCampaign
    ]
  );

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Container fluid>
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
    </div>
  );
};

CampaignForm.propTypes = propTypes;

export default CampaignForm;
