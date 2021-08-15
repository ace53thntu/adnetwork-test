import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Container,
  CardHeader,
  Button
} from 'reactstrap';
import BlockUi from 'react-block-ui';
import {useForm, FormProvider} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';

// components
import ContainerResources from './ContainerResources';
import ContainerSideBar from '../ContainerSideBar';

import {useGetContainer} from 'pages/Container/hooks/useContainer';
import {useContainerStore} from 'pages/Container/context';
import {useContainers} from 'pages/Container/hooks/useContainers';
import {validationDescriptionTab} from '../ContainerWebsiteTag/validations';
import useUpdateContainer from 'pages/Container/hooks/useUpdateContainer';
import useDeleteContainer from 'pages/Container/hooks/useDeleteContainer';
import {ButtonLoading} from 'components/common';
import DialogConfirm from 'components/common/DialogConfirm';
import {FormRadioGroup, FormTextInput} from 'components/forms';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';

function ContainerDetail() {
  const {t} = useTranslation();
  const {cid: containerId} = useParams();
  const {selectContainer} = useContainerStore();

  const {data: containers} = useContainers({});
  const {data: container, isFetching, isError, error} = useGetContainer({
    containerId
  });

  useEffect(() => {
    if (containerId) {
      selectContainer(containerId);
    }
    return () => {
      selectContainer(null);
    };
  }, [containerId, selectContainer]);

  const hasWebsiteTag = container?.source?.['web'] ? true : false;
  const countWebsiteTagPages = container?.source?.['web']?.length ?? 0;

  const hasIOSTag = container?.source?.['ios'] ? true : false;
  const countIOSTagPages = container?.source?.['ios']?.length ?? 0;

  const hasAndroidTag = container?.source?.['android'] ? true : false;
  const countAndroidTagPages = container?.source?.['android']?.length ?? 0;

  const hasImport = container?.import_count > 0 ? true : false;

  const hasTransfer = container?.transfer_count > 0 ? true : false;

  if (isFetching) {
    return <div>{t('loading')}</div>;
  }

  return (
    <>
      <ContainerSideBar />
      <AppContent>
        <PageTitleAlt
          heading={container?.name ?? t('containerDetail')}
          subheading={t('containerDescription')}
          icon="pe-7s-plane icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col sm={6}>
              <Card>
                <CardHeader>{t('containerInfo')}</CardHeader>
                <CardBody>
                  {isError ? (
                    <div>{error}</div>
                  ) : (
                    <ContainerForm
                      container={container}
                      containers={containers}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
            <Col sm={6}>
              <ContainerResources
                hasIOSTag={hasIOSTag}
                hasWebsiteTag={hasWebsiteTag}
                countIOSTagPages={countIOSTagPages}
                countWebsiteTagPages={countWebsiteTagPages}
                hasImport={hasImport}
                hasTransfer={hasTransfer}
                hasAndroidTag={hasAndroidTag}
                countAndroidTagPages={countAndroidTagPages}
                importCount={container?.import_count}
                transferCount={container?.transfer_count}
              />
            </Col>
          </Row>
        </Container>
      </AppContent>
    </>
  );
}

export default ContainerDetail;

function ContainerForm({container, containers = []}) {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const {name = '', url = '', status = 'active', id: containerId} = container;
  const filteredContainer = containers.filter(cnt => cnt.id !== container.id);

  const methods = useForm({
    defaultValues: {
      name,
      url,
      status
    },
    resolver: validationDescriptionTab(filteredContainer)
  });
  const {handleSubmit, formState} = methods;
  const [updateContainer] = useUpdateContainer();
  const {updateContainer: updateContainerDispatch} = useContainerStore();
  const [deleteContainer] = useDeleteContainer();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setOpenConfirm(false);
      setIsLoading(false);
    };
  }, []);

  const onHandleSubmit = useCallback(
    async formValues => {
      try {
        await updateContainer({
          cid: container.id,
          data: formValues
        });
        updateContainerDispatch();
        toast.success(t('updateContainerSuccessfully'), {
          closeOnClick: true
        });
      } catch (error) {
        console.log('onHandleSubmit -> error', error);
        toast.error(error, {
          closeOnClick: true
        });
      }
    },
    [container.id, updateContainer, updateContainerDispatch, t]
  );

  const onRemoveContainer = useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteContainer({containerId});
      toast.success(t('removeContainerSuccessfully'), {
        closeOnClick: true
      });
      navigate(`/container`);
    } catch (error) {
      console.log('onRemoveContainer -> error', error);
      toast.error(error, {
        closeOnClick: true
      });
      setIsLoading(false);
      setOpenConfirm(false);
    }
  }, [containerId, deleteContainer, navigate, t]);

  return (
    <FormProvider {...methods}>
      <BlockUi tag="div" blocking={formState.isSubmitting}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Row>
            <Col sm={12} md={12}>
              <FormTextInput
                isRequired
                name="name"
                placeholder={t('containerName')}
                label={t('containerName')}
                disable={formState.isSubmitting}
              />
              <FormTextInput
                name="url"
                placeholder={t('containerURL')}
                label={t('containerURL')}
                disable={formState.isSubmitting}
              />
              <FormRadioGroup
                inline
                label={t('status')}
                name="status"
                items={[
                  {
                    id: 'draft',
                    label: t('draft'),
                    value: 'draft'
                  },
                  {
                    id: 'active',
                    label: t('active'),
                    value: 'active'
                  }
                ]}
                disabled={formState.isSubmitting}
              />

              <FormGroup className="d-flex justify-content-between align-items-center">
                <ButtonLoading
                  loading={formState.isSubmitting}
                  type="submit"
                  className="btn-primary"
                  disabled={!formState.isDirty}
                >
                  {t('saveContainer')}
                </ButtonLoading>
                <Button
                  color="danger"
                  className="btn-icon"
                  onClick={() => setOpenConfirm(true)}
                >
                  <i className="pe-7s-trash btn-icon-wrapper"> </i>
                  {t('remove')}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </BlockUi>
      <DialogConfirm
        disableBackdropClick
        disableEscapeKeyDown
        isLoading={isLoading}
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleAgree={onRemoveContainer}
      />
    </FormProvider>
  );
}
