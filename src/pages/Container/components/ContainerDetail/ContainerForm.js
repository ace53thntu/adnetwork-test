import {BlockOverlay, ButtonLoading, DialogConfirm} from 'components/common';
import {FormTextInput, FormToggle} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {RoutePaths} from 'constants/route-paths';
import {CONTAINERS} from 'pages/Container/hooks/constants';
import {useRefreshContainerTree} from 'pages/Container/hooks/useRefeshContainerTree';
import {USER_ROLE} from 'pages/user-management/constants';
//---> External Modules
import PropTypes from 'prop-types';
import {useDeleteContainer, useEditContainer} from 'queries/container';
//---> Build-in Modules
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import {Button, Col, FormGroup, Row} from 'reactstrap';
//---> Internal Modules
import {
  updatedContainerRedux,
  useContainerSelector
} from 'store/reducers/container';
import {getRole} from 'utils/helpers/auth.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {ContainerDefault} from '../ContainerFormFields';
import PublisherSelect from './PublisherSelect';
import {mappingApiToForm, mappingFormToApi} from './dto';
import {validationDescriptionTab} from './validation';

const propTypes = {
  container: PropTypes.object,
  isEdit: PropTypes.bool
};

function ContainerForm(props) {
  const {container, isEdit = false} = props;
  const role = getRole();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const clientCache = useQueryClient();
  const dispatch = useDispatch();
  const {refresh} = useRefreshContainerTree();

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
    resolver: validationDescriptionTab(filteredContainer, role)
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
  }, []);

  React.useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues, reset]);

  const onHandleSubmit = async values => {
    setIsLoading(true);
    try {
      let containerId = container?.uuid ?? containerRedux?.uuid;
      const formData = mappingFormToApi(values, role);
      const {data} = await updateContainerRequest({
        cid: containerId,
        data: formData
      });

      setIsLoading(false);
      ShowToast.success(t('updateContainerSuccessfully'));
      reset(values);
      dispatch(updatedContainerRedux({...data, id: data?.uuid}));
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

      await refresh();

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
              {[USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role) && (
                <CurrencyInputField
                  name="cost"
                  label="Commission Cost"
                  placeholder="Commission Cost"
                  disabled={isLoading}
                  decimalSeparator="."
                  groupSeparator=","
                  disableGroupSeparators={false}
                  decimalsLimit={2}
                  maxLength="4"
                  description="The cost should be between 0.01 and 0.99"
                  required
                />
              )}

              <div className="d-flex">
                <FormGroup className="d-flex  mb-0 ">
                  <FormToggle
                    name="status"
                    defaultCheckedValue="active"
                    label={t('status')}
                    values={{
                      checked: 'active',
                      unChecked: 'inactive'
                    }}
                  />
                </FormGroup>

                <FormGroup className="d-flex  mb-0 ml-3">
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
              </div>
              <ContainerDefault isLoading={isLoading} />

              <hr />
              <FormGroup className="d-flex justify-content-end align-items-center mt-3">
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
                  className="btn-icon ml-2"
                  onClick={() => setOpenConfirm(true)}
                  disabled={isDeleting}
                >
                  <i className="pe-7s-trash btn-icon-wrapper"> </i>
                  {t('remove')}
                </Button>
                <Link
                  to={`/${RoutePaths.CONTAINER}/${container?.uuid}/${RoutePaths.REPORT}`}
                >
                  <ButtonLoading type="button" className="btn-success ml-2">
                    {t('viewReport')}
                  </ButtonLoading>
                </Link>
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
