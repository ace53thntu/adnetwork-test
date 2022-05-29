//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  Label,
  Row
} from 'reactstrap';

//---> Internal Modules
import {ActiveToggle, FormReactSelect, FormTextInput} from 'components/forms';
import {InputNames, TrackerTemplateTypeOptions} from '../constant';
import {useTranslation} from 'react-i18next';
import {useDefaultValues} from '../hook';
import {schemaValidate} from './validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {formToApi} from 'entities/TrackerTemplate';
import {
  useCreateTrackerTemplate,
  useEditTrackerTemplate
} from 'queries/tracker-template';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import {RequiredLabelPrefix} from 'components/common/RequireLabelPrefix';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {useQueryClient} from 'react-query';
import {GET_TRACKER_TEMPLATE} from 'queries/tracker-template/constants';

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
  const {handleSubmit, formState, control} = methods;

  async function onSubmit(formData) {
    const data = formToApi({formData});
    if (!isEdit) {
      try {
        await createTrackerTemplate(data);
        ShowToast.success('Created tracker template successfully');
        navigate(`/${RoutePaths.SETTING}/${RoutePaths.TRACKER_TEMPLATE}`);
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to create tracker template');
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
        ShowToast.error(err?.msg || 'Fail to update tracker template');
      }
    }
  }

  return (
    <Card className="main-card mb-3">
      <FormProvider {...methods}>
        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <BlockUi tag="div" blocking={formState.isSubmitting}>
            <CardBody>
              <Row>
                {/* Name */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.NAME}
                    label={t('name')}
                    placeholder={t('enterName')}
                    isRequired
                  />
                </Col>

                {/* Status */}
                <Col sm="3">
                  <Label className="mr-5">
                    <RequiredLabelPrefix>*</RequiredLabelPrefix>
                    {t('status')}
                  </Label>
                  <Controller
                    control={control}
                    name={InputNames.STATUS}
                    render={({onChange, onBlur, value, name}) => (
                      <ActiveToggle value={value} onChange={onChange} />
                    )}
                  />
                </Col>

                {/* HTTPS */}
                <Col sm="3">
                  <Label className="mr-5">{t('https')}</Label>
                  <Controller
                    control={control}
                    name={InputNames.HTTPS}
                    render={({onChange, onBlur, value, name}) => (
                      <ActiveToggle value={value} onChange={onChange} />
                    )}
                  />
                </Col>

                {/* Type */}
                <Col sm={6}>
                  <FormReactSelect
                    defaultValue={null}
                    name={InputNames.TYPE}
                    label={t('type')}
                    placeholder={t('selectType')}
                    options={TrackerTemplateTypeOptions}
                    required
                  />
                </Col>

                {/* Price */}
                <Col sm={6}>
                  <CurrencyInputField
                    name={InputNames.PRICE}
                    label={t('price')}
                    placeholder="0.00"
                    decimalSeparator="."
                    groupSeparator=","
                    disableGroupSeparators={false}
                    decimalsLimit={3}
                    prefix="$"
                    required
                  />
                </Col>

                {/* Click URL */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.CLICK_URL}
                    label={t('clickUrl')}
                    placeholder={t('enterClickUrl')}
                  />
                </Col>

                {/* Click Image */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.CLICK_IMAGE}
                    label={t('clickImage')}
                    placeholder={t('enterClickImage')}
                  />
                </Col>

                {/* Click Script */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.CLICK_SCRIPT}
                    label={t('clickScript')}
                    placeholder={t('enterClickScript')}
                  />
                </Col>

                {/* Skip */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.SKIP}
                    label={t('skipUrl')}
                    placeholder={t('enterSkip')}
                  />
                </Col>

                {/* First Quartile */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.FIRST_QUARTILE}
                    label={t('firstQuartile')}
                    placeholder={t('enterFirstQuartile')}
                  />
                </Col>

                {/* Midpoint */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.MIDPOINT}
                    label={t('midpoint')}
                    placeholder={t('enterMidpoint')}
                  />
                </Col>

                {/* Third Quartile */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.THIRD_QUARTILE}
                    label={t('thirdQuartile')}
                    placeholder={t('enterThirdQuartile')}
                  />
                </Col>

                {/* Complete */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.COMPLETE}
                    label={t('complete')}
                    placeholder={t('enterComplete')}
                  />
                </Col>

                {/* Impression script */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.IMPRESSION_SCRIPT}
                    label={t('impressionScript')}
                    placeholder={`${t('enter')} ${t('impressionScript')}`}
                  />
                </Col>

                {/* Impression image */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.IMPRESSION_IMAGE}
                    label={t('impressionImage')}
                    placeholder={`${t('enter')} ${t('impressionImage')}`}
                  />
                </Col>

                {/* Impression url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.IMPRESSION_URL}
                    label={t('impressionUrl')}
                    placeholder={`${t('enter')} ${t('impressionUrl')}`}
                  />
                </Col>

                {/* Start url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.START_URL}
                    label={t('startUrl')}
                    placeholder={`${t('enter')} ${t('startUrl')}`}
                  />
                </Col>

                {/* Mute url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.MUTE_URL}
                    label={t('muteUrl')}
                    placeholder={`${t('enter')} ${t('muteUrl')}`}
                  />
                </Col>

                {/* UnMute url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.UNMUTE_URL}
                    label={t('unmuteUrl')}
                    placeholder={`${t('enter')} ${t('unmuteUrl')}`}
                  />
                </Col>

                {/* Pause url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.PAUSE_URL}
                    label={t('pauseUrl')}
                    placeholder={`${t('enter')} ${t('pauseUrl')}`}
                  />
                </Col>

                {/* Resume url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.RESUME_URL}
                    label={t('resumeUrl')}
                    placeholder={`${t('enter')} ${t('resumeUrl')}`}
                  />
                </Col>

                {/* Rewind url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.REWIND_URL}
                    label={t('rewindUrl')}
                    placeholder={`${t('enter')} ${t('rewindUrl')}`}
                  />
                </Col>

                {/* Fullscreen url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.FULLSCREEN_URL}
                    label={t('fullscreenUrl')}
                    placeholder={`${t('enter')} ${t('fullscreenUrl')}`}
                  />
                </Col>

                {/* Exit Fullscreen url */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.EXIT_FULLSCREEN_URL}
                    label={t('exitFullscreenUrl')}
                    placeholder={`${t('enter')} ${t('exitFullscreenUrl')}`}
                  />
                </Col>

                {/* Click Url Append Params */}
                <Col sm={6}>
                  <FormTextInput
                    name={InputNames.CLICK_URL_APPEND_PARAMS}
                    label={t('clickUrlAppendParams')}
                    placeholder={t('enterClickUrlAppendParams')}
                  />
                </Col>

                {/* Code */}
                <Col sm={12}>
                  <FormCodeMirror
                    name={InputNames.CODE}
                    label={t('code')}
                    placeholder="<div>Code example</div>"
                    extension="HTML"
                  />
                </Col>

                <Col sm={12} className="mt-2">
                  <FormCodeMirror
                    name={InputNames.VARIABLES}
                    label={t('variables')}
                    extension="JSON"
                  />
                </Col>
              </Row>
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
