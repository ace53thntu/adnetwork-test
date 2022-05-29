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
import {ApiError, LoadingIndicator} from 'components/common';
import {ActiveToggle, FormTextInput} from 'components/forms';
import {InputNames} from '../constant';
import {useTranslation} from 'react-i18next';
import {useDefaultValues} from '../hook';
import {schemaValidate} from './validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateKeywordList, useEditKeywordList} from 'queries/keyword-list';
import {formToApi} from 'entities/KeywordList';
import KeywordSelectCreatable from './KeywordSelectCreatable';

const propTypes = {
  title: PropTypes.string,
  toggle: PropTypes.func,
  isEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  keywordList: PropTypes.any
};

const KeywordListForm = ({
  title = 'Create keyword list',
  isEdit = false,
  toggle = () => null,
  isLoading = false,
  keywordList = null
}) => {
  const {t} = useTranslation();
  // React Query - hooks
  const {mutateAsync: createKeywordList} = useCreateKeywordList();
  const {mutateAsync: editKeywordList} = useEditKeywordList(keywordList?.uuid);

  const defaultValues = useDefaultValues({keywordList});
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control} = methods;

  async function onSubmit(formData) {
    console.log(
      '🚀 ~ file: keyword list.form.js ~ line 19 ~ onSubmit ~ formData',
      formData
    );
    const data = formToApi({formData});
    if (!isEdit) {
      try {
        await createKeywordList(data);
        ShowToast.success('Created keyword list successfully');
        toggle();
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
      }
    } else {
      try {
        await editKeywordList({keywordListId: keywordList?.uuid, data});
        ShowToast.success('Updated keyword list successfully');
        toggle();
      } catch (err) {
        ShowToast.error(<ApiError apiError={err} />);
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
              <Col sm="3">
                <Label className="mr-5">{t('shared')}</Label>
                <Controller
                  control={control}
                  name={InputNames.SHARED}
                  render={({onChange, onBlur, value, name}) => (
                    <ActiveToggle value={value} onChange={onChange} />
                  )}
                />
              </Col>
              {/* Description */}
              <Col sm={12}>
                <FormTextInput
                  name={InputNames.DESCRIPTION}
                  label={t('description')}
                  placeholder={t('enterDescription')}
                  type="textarea"
                />
              </Col>
              <Col sm="12">
                <KeywordSelectCreatable defaultValue={[]} />
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

KeywordListForm.propTypes = propTypes;

export default KeywordListForm;
