//---> Build-in Modules
import * as React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {Button, Col, FormGroup, Row} from 'reactstrap';

//---> Internal Modules
import {
  updatedContainerRedux,
  useContainerSelector
} from 'store/reducers/container';
import {CONTAINERS} from 'pages/Container/hooks/constants';
import {BlockOverlay, ButtonLoading, DialogConfirm} from 'components/common';
import {FormRadioGroup, FormTextInput, FormToggle} from 'components/forms';
import {useDeleteContainer, useEditContainer} from 'queries/container';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {mappingApiToForm, mappingFormToApi} from './dto';
import PublisherSelect from './PublisherSelect';
import {validationDescriptionTab} from './validattion';

const propTypes = {
  container: PropTypes.object,
  isEdit: PropTypes.bool
};

function ContainerForm(props) {
  const {container, isEdit = false} = props;

  const {t} = useTranslation();
  const navigate = useNavigate();
  const clientCache = useQueryClient();
  const dispatch = useDispatch();

  const {
    containers: containersRedux,
    container: containerRedux
  } = useContainerSelector();

  const {mutateAsync: updateContainerRequest} = useEditContainer(
    container?.uuid
  );
  const {mutateAsync: deleteContainerRequest} = useDeleteContainer();

  const filteredContainer = containersRedux.filter(cnt =>
    container?.uuid ? cnt.id !== container.uuid : cnt.id !== containerRedux.uuid
  );

  const formDefaultValues = React.useMemo(() => {
    return mappingApiToForm({container, containerRedux, t});
  }, [container, containerRedux, t]);

  const methods = useForm({
    defaultValues: formDefaultValues,
    resolver: validationDescriptionTab(filteredContainer)
  });

  const {handleSubmit, formState, reset} = methods;

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setOpenConfirm(false);
      setIsLoading(false);
    };
  }, [reset, t]);

  React.useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues, reset]);

  const onHandleSubmit = async values => {
    setIsLoading(true);
    try {
      let containerId = container?.uuid ?? containerRedux?.uuid;
      const formData = mappingFormToApi(values);
      await updateContainerRequest({
        cid: containerId,
        data: formData
      });
      setIsLoading(false);
      ShowToast.success(t('updateContainerSuccessfully'));
      reset(values);
      dispatch(
        updatedContainerRedux({
          ...container,
          ...containerRedux,
          ...values
        })
      );
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.message);
    }
  };

  const onRemoveContainer = async () => {
    setIsDeleting(true);
    try {
      let containerId = container?.uuid ?? containerRedux?.uuid;
      await deleteContainerRequest({cid: containerId});
      setIsDeleting(false);
      setOpenConfirm(false);
      ShowToast.success(t('removeContainerSuccessfully'));
      await clientCache.invalidateQueries([CONTAINERS]);
      navigate(`/container`);
    } catch (error) {
      setIsDeleting(false);
      ShowToast.error(error?.message);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          {isLoading ? <BlockOverlay /> : null}
          <Row>
            <Col sm={12} md={12}>
              <PublisherSelect
                currentContainer={formDefaultValues}
                isEdit={isEdit}
              />
              <FormTextInput
                isRequired
                name="name"
                placeholder={t('containerName')}
                label={t('containerName')}
              />
              <FormTextInput
                name="url"
                placeholder={t('containerURL')}
                label={t('containerURL')}
              />
              <FormTextInput
                name="cost"
                label="Cost"
                placeholder="0.0"
                disable={isLoading}
                isRequired
              />
              <FormRadioGroup
                inline
                label={t('status')}
                name="status"
                items={[
                  {
                    id: 'delete',
                    label: t('delete'),
                    value: 'delete'
                  },
                  {
                    id: 'active',
                    label: t('active'),
                    value: 'active'
                  }
                ]}
              />
              <FormGroup className="d-flex  mb-0 ">
                <FormToggle
                  name="first_party"
                  defaultCheckedValue="active"
                  label={t('firstParty')}
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                />
              </FormGroup>

              <FormGroup className="d-flex justify-content-between align-items-center mt-3">
                <ButtonLoading
                  loading={isLoading}
                  type="submit"
                  className="btn-primary"
                  disabled={!formState.isDirty || isLoading}
                >
                  {t('saveContainer')}
                </ButtonLoading>
                <Button
                  color="danger"
                  className="btn-icon"
                  onClick={() => setOpenConfirm(true)}
                  disabled={isDeleting}
                >
                  <i className="pe-7s-trash btn-icon-wrapper"> </i>
                  {t('remove')}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </FormProvider>

      <DialogConfirm
        disableBackdropClick
        disableEscapeKeyDown
        isLoading={isDeleting}
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleAgree={onRemoveContainer}
      />
    </>
  );
}

ContainerForm.propTypes = propTypes;

export default ContainerForm;
