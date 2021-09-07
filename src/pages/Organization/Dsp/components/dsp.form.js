//---> Build-in Modules
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Label
} from 'reactstrap';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {ActiveToogle, FormReactSelect, FormTextInput} from 'components/forms';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import LoadingIndicator from 'components/common/LoadingIndicator';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateDsp, useEditDsp, useGetDsp} from 'queries/dsp';
import {INPUT_NAME} from '../constants';
import {mappingFormToApi} from './dto';
import {useDefaultDsp} from 'pages/Organization/hooks';
import {schemaValidate} from './validation';

const DspForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new DSP',
  isEdit = false,
  dspId = ''
}) => {
  const {t} = useTranslation();
  const {data: dspData, isFetched, isLoading} = useGetDsp(dspId);
  const {mutateAsync: createDsp} = useCreateDsp();
  const {mutateAsync: editDsp} = useEditDsp();
  const defaultValues = useDefaultDsp({
    dspData
  });

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, reset} = methods;

  useEffect(() => {
    //---> Reset default value when API response
    if (isFetched && defaultValues?.name) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, isFetched]);

  /**
   * Submit form
   * @param {JSON} formData
   */
  const onSubmit = async formData => {
    console.log(
      '🚀 ~ file: DSP.form.js ~ line 18 ~ onSubmit ~ formData',
      formData
    );
    const requestBody = mappingFormToApi({formData});
    if (!isEdit) {
      // CREATE
      try {
        await createDsp(requestBody);
        ShowToast.success('Created DSP successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: DSP.form.js ~ line 61 ~ err', err);
        ShowToast.error(err || 'Fail to create DSP');
      }
    } else {
      // EDIT
      try {
        await editDsp({advId: dspId, data: requestBody});
        ShowToast.success('Updated DSP successfully');
        toggle();
      } catch (err) {
        console.log('🚀 ~ file: DSP.form.js ~ line 61 ~ err', err);
        ShowToast.error(err || 'Fail to update DSP');
      }
    }
  };

  return (
    <Modal unmountOnClose isOpen={modal} className={className} size="lg">
      <FormProvider {...methods}>
        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <BlockUi tag="div" blocking={formState.isSubmitting}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              {isLoading && <LoadingIndicator />}
              <Row>
                <Col sm={12}>
                  <FormTextInput
                    name={INPUT_NAME.NAME}
                    label={t('name')}
                    placeholder={t('enterName')}
                    isRequired
                  />
                </Col>
                <Col sm={12}>
                  <FormTextInput
                    name={INPUT_NAME.URL}
                    label={t('url')}
                    placeholder={t('enterUrl')}
                    isRequired
                  />
                </Col>
                {/* Domains */}
                <Col sm={12}>
                  <FormReactSelect
                    name={INPUT_NAME.DOMAINS}
                    label={t('domains')}
                    placeholder={t('selectDomains')}
                    options={[]}
                    defaultValue={null}
                    multiple
                  />
                </Col>
                <Col sm={12}>
                  <FormTextInput
                    name={`${INPUT_NAME.CREDENTIAL}.${INPUT_NAME.API_KEY}`}
                    label={t('apiKey')}
                    placeholder={t('enterApiKey')}
                    isRequired
                  />
                </Col>
                <Col sm={12}>
                  <FormTextInput
                    name={`${INPUT_NAME.CREDENTIAL}.${INPUT_NAME.USER}`}
                    label={t('user')}
                    placeholder={t('enterUser')}
                    isRequired
                  />
                </Col>
                <Col sm={12}>
                  <FormTextInput
                    name={`${INPUT_NAME.CREDENTIAL}.${INPUT_NAME.PASSWORD}`}
                    label={t('password')}
                    placeholder={t('enterPassword')}
                    isRequired
                    type="password"
                  />
                </Col>
                {/* Status */}
                <Col md="12">
                  <Label className="mr-5">{t('status')}</Label>
                  <Controller
                    control={control}
                    name={INPUT_NAME.STATUS}
                    render={({onChange, onBlur, value, name}) => (
                      <ActiveToogle value={value} onChange={onChange} />
                    )}
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                color="link"
                onClick={() => {
                  reset();
                  toggle();
                }}
                type="button"
              >
                {t('cancel')}
              </Button>
              <Button color="primary" type="submit">
                {t('save')}
              </Button>{' '}
            </ModalFooter>
          </BlockUi>
        </Form>
      </FormProvider>
    </Modal>
  );
};

DspForm.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  dspId: PropTypes.string,
  isEdit: PropTypes.bool,
  IABsOptions: PropTypes.array
};

export default DspForm;
