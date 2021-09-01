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
// import ContainerSideBar from '../ContainerSideBar';

import {useContainerStore} from 'pages/Container/context';
import {validationDescriptionTab} from '../ContainerWebsiteTag/validations';
import {ButtonLoading} from 'components/common';
import DialogConfirm from 'components/common/DialogConfirm';
import {FormRadioGroup, FormReactSelect, FormTextInput} from 'components/forms';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {useGetContainer} from 'queries/container/useGetContainer';
import {useEditContainer} from 'queries/container/useEditContainer';
import {useDeleteContainer} from 'queries/container/useDeleteContainer';
import {useGetContainers} from 'queries/container/useGetContainers';
import {useGetContainerPages} from 'queries/container/useGetContainerPages';
import {useCountSource} from 'pages/Container/hooks/useCountSource';
import {usePublisherOptions} from 'pages/Container/hooks/usePublisherOptions';
import {destructureFormData} from '../ContainerCreateDialog/dto';

const checkHasSource = ({source = 'web', pages = []}) => {
  const foundSource = pages?.find(item => item?.source === source);
  if (foundSource) return true;
  return false;
};

function ContainerDetail() {
  const {t} = useTranslation();
  const {cid: containerId} = useParams();
  const {selectContainer} = useContainerStore();

  const {data: containers} = useGetContainers();
  const {data: container, isFetching, isError, error} = useGetContainer(
    containerId
  );
  const {data: pages = []} = useGetContainerPages(containerId);
  const countSource = useCountSource(pages);

  useEffect(() => {
    if (containerId) {
      selectContainer(containerId);
    }
    return () => {
      selectContainer(null);
    };
  }, [containerId, selectContainer]);

  const hasWebsiteTag = checkHasSource({pages});
  const countWebsiteTagPages = countSource?.['web'];

  const hasIOSTag = checkHasSource({source: 'ios', pages});
  const countIOSTagPages = countSource?.['ios'];

  const hasAndroidTag = checkHasSource({source: 'android', pages});
  const countAndroidTagPages = countSource?.['android'];

  const hasImport = container?.import_count > 0 ? true : false;

  const hasTransfer = container?.transfer_count > 0 ? true : false;

  if (isFetching) {
    return <div>{t('loading')}</div>;
  }

  return (
    <>
      {/* <ContainerSideBar /> */}
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
  const publishers = usePublisherOptions();
  const {
    name = '',
    url = '',
    status = 'active',
    id: containerId,
    publisher_uuid
  } = container;
  console.log(
    '🚀 ~ file: ContainerDetail.js ~ line 135 ~ ContainerForm ~ container',
    container
  );
  const filteredContainer = containers?.items?.filter(
    cnt => cnt.id !== container.id
  );
  const foundPublisher = publishers?.find(
    item => item?.value === publisher_uuid
  );
  console.log(
    '🚀 ~ file: ContainerDetail.js ~ line 149 ~ ContainerForm ~ foundPublisher',
    foundPublisher
  );

  const methods = useForm({
    defaultValues: {
      name,
      url,
      status,
      publisher: foundPublisher ?? null
    },
    resolver: validationDescriptionTab(filteredContainer)
  });
  const {handleSubmit, formState, reset} = methods;
  const {mutateAsync: updateContainer} = useEditContainer();
  const {updateContainer: updateContainerDispatch} = useContainerStore();
  const {mutateAsync: deleteContainer} = useDeleteContainer();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reset({name, url, status, publisher: foundPublisher ?? null});
  }, [foundPublisher, name, reset, status, url]);

  useEffect(() => {
    return () => {
      setOpenConfirm(false);
      setIsLoading(false);
    };
  }, []);

  const onHandleSubmit = useCallback(
    async formValues => {
      const formData = destructureFormData(formValues);
      try {
        await updateContainer({
          cid: container.uuid,
          data: formData
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
    [container, updateContainer, updateContainerDispatch, t]
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
              <FormReactSelect
                required
                name="publisher"
                label="Publisher"
                placeholder={'Select publisher'}
                options={publishers}
              />
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
