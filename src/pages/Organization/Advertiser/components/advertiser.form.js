//---> Build-in Modules
import React from 'react';
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
import {INPUT_NAME} from '../constants';
import {useGetIABs} from 'queries/iabs';
import {useIABsOptions} from 'pages/Organization/hooks';
import SelectTag from './SelectTag';
import {useDefaultAdvertiser} from 'pages/Organization/hooks/useDefaultAdvertiser';
import {mappingFormToApi} from './dto';
import {useCreateAdvertiser} from 'queries/advertiser';

const AdvertiserForm = ({
  modal = false,
  toggle = () => {},
  className = '',
  title = 'Create new Advertiser'
}) => {
  const {t} = useTranslation();
  const {data: IABs} = useGetIABs();
  const IABsOptions = useIABsOptions({IABs});
  const defaultValues = useDefaultAdvertiser();
  const {mutateAsync: createAdvertiser} = useCreateAdvertiser();
  // const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    defaultValues
  });
  const {handleSubmit, formState, control} = methods;

  /**
   * Submit form
   * @param {JSON} formData
   */
  const onSubmit = async formData => {
    console.log(
      '🚀 ~ file: advertiser.form.js ~ line 18 ~ onSubmit ~ formData',
      formData
    );
    const requestBody = mappingFormToApi({formData});
    // setIsLoading(true);
    try {
      await createAdvertiser(requestBody);
      toggle();
    } catch (err) {
      console.log('🚀 ~ file: advertiser.form.js ~ line 61 ~ err', err);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={modal} className={className} size="lg">
      <FormProvider {...methods}>
        <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <BlockUi tag="div" blocking={formState.isSubmitting}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              <Row>
                <Col sm={12}>
                  <FormTextInput
                    name={INPUT_NAME.NAME}
                    label={t('name')}
                    placeholder={t('enterName')}
                    isRequired
                  />
                </Col>
                {/* IABs */}
                <Col sm={12}>
                  <FormReactSelect
                    name={INPUT_NAME.IABS}
                    label={t('iabs')}
                    placeholder={t('selectIABs')}
                    options={IABsOptions}
                    defaultValue={null}
                    multiple
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
                {/* Tags */}
                <Col sm={12}>
                  <SelectTag />
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
              <Button color="link" onClick={toggle} type="button">
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

AdvertiserForm.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string
};

export default AdvertiserForm;
