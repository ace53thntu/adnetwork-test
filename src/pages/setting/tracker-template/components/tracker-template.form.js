//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import {
  Button,
  Col,
  Form,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
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

const propTypes = {
  title: PropTypes.string,
  toggle: PropTypes.func,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  trackerTemplate: PropTypes.any
};

const TrackerTemplateForm = ({
  title = 'Create tracker template',
  isEdit = false,
  toggle = () => null,
  isLoading = false,
  trackerTemplate = null
}) => {
  const {t} = useTranslation();
  // React Query - hooks
  const {mutateAsync: createTrackerTemplate} = useCreateTrackerTemplate();
  const {mutateAsync: editTrackerTemplate} = useEditTrackerTemplate(
    trackerTemplate?.uuid
  );

  const defaultValues = useDefaultValues({trackerTemplate});
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, errors} = methods;
  console.log('🚀 ~ file: tracker-template.form.js ~ line 68 ~ errors', errors);

  async function onSubmit(formData) {
    const data = formToApi({formData});
    if (!isEdit) {
      try {
        await createTrackerTemplate(data);
        ShowToast.success('Created tracker template successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to create tracker template');
      }
    } else {
      try {
        await editTrackerTemplate({
          trackTempId: trackerTemplate?.uuid,
          data
        });
        ShowToast.success('Updated tracker template successfully');
        toggle();
      } catch (err) {
        ShowToast.error(err?.msg || 'Fail to update tracker template');
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {isLoading && <LoadingIndicator />}
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
                <Label className="mr-5">{t('status')}</Label>
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
                  isRequired
                />
              </Col>

              {/* Click Image */}
              <Col sm={6}>
                <FormTextInput
                  name={InputNames.CLICK_IMAGE}
                  label={t('clickImage')}
                  placeholder={t('enterClickImage')}
                  isRequired
                />
              </Col>

              {/* Click Script */}
              <Col sm={6}>
                <FormTextInput
                  name={InputNames.CLICK_SCRIPT}
                  label={t('clickScript')}
                  placeholder={t('enterClickScript')}
                  isRequired
                />
              </Col>

              {/* Skip */}
              <Col sm={6}>
                <FormTextInput
                  name={InputNames.SKIP}
                  label={t('skip')}
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

              {/* Click Url Append Params */}
              <Col sm={12}>
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
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={toggle} type="button">
              {t('cancel')}
            </Button>
            <Button color="primary" type="submit" disabled={!formState.isDirty}>
              {t('save')}
            </Button>
          </ModalFooter>
        </BlockUi>
      </Form>
    </FormProvider>
  );
};

TrackerTemplateForm.propTypes = propTypes;

export default TrackerTemplateForm;
