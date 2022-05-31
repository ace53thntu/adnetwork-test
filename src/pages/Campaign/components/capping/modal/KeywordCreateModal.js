// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

// Internal Modules
import {ApiError, ButtonLoading} from 'components/common';
import {useCreateCapping} from 'queries/capping';
import {CAMPAIGN_KEYS} from 'pages/Campaign/constants';
import {initializingDefaultValues} from '../dto';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import KeywordListSelect from 'components/forms/KeywordListSelect';

const propTypes = {
  openForm: PropTypes.bool,
  toggleModal: PropTypes.func,
  cappingType: PropTypes.object,
  referenceType: PropTypes.string,
  referenceUuid: PropTypes.string
};

const KeywordCreateModal = ({
  openForm = false,
  toggleModal = () => null,
  cappingType = {},
  referenceType = '',
  referenceUuid = ''
}) => {
  const {t} = useTranslation();
  const {mutateAsync: createCapping} = useCreateCapping();
  const methods = useForm({
    defaultValues: initializingDefaultValues({cappingType, referenceType})
  });

  const {handleSubmit, formState} = methods;

  async function onSubmit(formData) {
    let bodyRequest = {
      reference_type: referenceType,
      reference_uuid: referenceUuid,
      type: cappingType?.type,
      status: 'active'
    };
    bodyRequest.keywords_list_white_uuid =
      formData?.keywords_list_white_uuid?.length > 0
        ? Array.from(formData?.keywords_list_white_uuid, item => item.value)
        : [];
    bodyRequest.keywords_list_black_uuid =
      formData?.keywords_list_black_uuid?.length > 0
        ? Array.from(formData?.keywords_list_black_uuid, item => item.value)
        : [];

    try {
      await createCapping(bodyRequest);
      ShowToast.success('Created Capping Successfully');
      toggleModal();
    } catch (err) {
      ShowToast.error(<ApiError apiError={err || 'Fail to Created Capping'}/>);
    }
  }

  return (
    <Modal isOpen={openForm} size="lg">
      <ModalHeader>Create capping</ModalHeader>
      <BlockUi tag="div" blocking={formState.isSubmitting}>
        <ModalBody>
          <FormProvider {...methods}>
            <Form
              id="domainForm"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Row>
                <Col md="6">
                  <KeywordListSelect
                    name={CAMPAIGN_KEYS.KEYWORD_LIST_WHITE_UUID}
                    label={t('keywordListWhite')}
                    placeholder={t('selectKeywordListWhite')}
                    defaultValues={[]}
                    multiple
                  />
                </Col>
                <Col md="6">
                  <KeywordListSelect
                    name={CAMPAIGN_KEYS.KEYWORD_LIST_BLACK_UUID}
                    label={t('keywordListBlack')}
                    placeholder={t('selectKeywordListBlack')}
                    defaultValues={[]}
                    multiple
                  />
                </Col>
              </Row>
            </Form>
          </FormProvider>
        </ModalBody>
        <ModalFooter>
          <Button color="link" className="mr-2" onClick={toggleModal}>
            Close
          </Button>
          <ButtonLoading
            type="submit"
            className="mr-2 btn-primary"
            form="domainForm"
            loading={formState.isSubmitting}
          >
            {t('save')}
          </ButtonLoading>
        </ModalFooter>
      </BlockUi>
    </Modal>
  );
};

KeywordCreateModal.propTypes = propTypes;

export default KeywordCreateModal;
