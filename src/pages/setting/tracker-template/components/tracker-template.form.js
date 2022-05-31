//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Card, CardBody, CardFooter, Form} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {useDefaultValues} from '../hook';
import {schemaValidate} from './validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {formToApi} from 'entities/TrackerTemplate';
import {
  useCreateTrackerTemplate,
  useEditTrackerTemplate
} from 'queries/tracker-template';
import {RoutePaths} from 'constants/route-paths';
import {GET_TRACKER_TEMPLATE} from 'queries/tracker-template/constants';
import BasicInfo from './BasicInfo';
import GeneralTracking from './GeneralTracking';
import VideoTracking from './VideoTracking';
import ExtraInformation from './ExtraInformation';
import {ApiError} from 'components/common';

const propTypes = {
  title: PropTypes.string,
  isEdit: PropTypes.bool,
  trackerTemplate: PropTypes.any
};

const TrackerTemplateForm = ({isEdit = false, trackerTemplate = null}) => {
  const {t} = useTranslation();
  const client = useQueryClient();
  const navigate = useNavigate();
  // React Query - hooks
  const {mutateAsync: createTrackerTemplate} = useCreateTrackerTemplate();
  const {mutateAsync: editTrackerTemplate} = useEditTrackerTemplate();

  const defaultValues = useDefaultValues({trackerTemplate});
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t),
    reValidateMode: 'onChange',
    mode: 'onChange'
  });
  const {handleSubmit, formState} = methods;

  async function onSubmit(formData) {
    const data = formToApi({formData});
    if (!isEdit) {
      try {
        await createTrackerTemplate(data);
        ShowToast.success('Created tracker template successfully');
        navigate(`/${RoutePaths.SETTING}/${RoutePaths.TRACKER_TEMPLATE}`);
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
      }
    } else {
      try {
        const {data: trkTemplateRes} = await editTrackerTemplate({
          trackTempId: trackerTemplate?.uuid,
          data
        });
        await client.invalidateQueries([
          GET_TRACKER_TEMPLATE,
          trkTemplateRes?.uuid
        ]);
        navigate(`/${RoutePaths.SETTING}/${RoutePaths.TRACKER_TEMPLATE}`);
        ShowToast.success('Updated tracker template successfully');
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
      }
    }
  }

  return (
    <Card className="main-card mb-3">
      <FormProvider {...methods}>
        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <BlockUi tag="div" blocking={formState.isSubmitting}>
            <CardBody>
              <BasicInfo />
              <GeneralTracking />
              <VideoTracking />
              <ExtraInformation />
            </CardBody>
            <CardFooter className="d-flex justify-content-end">
              <Button color="link" onClick={() => null} type="button">
                {t('cancel')}
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={!formState.isDirty}
              >
                {t('save')}
              </Button>
            </CardFooter>
          </BlockUi>
        </Form>
      </FormProvider>
    </Card>
  );
};

TrackerTemplateForm.propTypes = propTypes;

export default TrackerTemplateForm;
