import React, {useCallback, useEffect, useMemo} from 'react';
import BlockUi from 'react-block-ui';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {validationPage} from './validations';
import {useContainerStore} from '../../context';
import {SOURCE_FROM_TAG, TAG_FROM_SOURCE} from '../ContainerTree/constants';
import {
  DEFAULT_EVENT_PROPERTIES,
  EVENT_TYPES_VALUE,
  getContainerTags
} from 'pages/Container/constants';
import {COLLECT_TYPES} from './constants';
import {
  FormReactSelect,
  FormTextInput,
  FormToggle,
  SelectCreatable
} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreatePage, useGetPagesByContainer} from 'queries/page';
import {useCreateInventory} from 'queries/inventory';

function CreatePage({
  toggle,
  pageTags = [],
  source = null,
  shouldRefetch = false
}) {
  const {cid, pageId} = useParams();
  console.log('🚀 ~ file: CreatePage.js ~ line 34 ~ cid', cid);
  const navigate = useNavigate();
  const {createPage: dispatchCreatePage} = useContainerStore();
  const {data: pages = []} = useGetPagesByContainer(cid);

  const isMobile = source === 'ios' || source === 'android';

  const formLabelsName = {
    pageName: isMobile ? 'Screen name' : 'Page name',
    pageURL: 'Page URL',
    pageType: isMobile ? 'Screen type' : 'Page type',
    pageTypePlaceholder: isMobile
      ? 'Select a screen type'
      : 'Select a page type',
    pageTag: isMobile ? 'Tag' : 'Tag',
    pageTagPlaceholder: isMobile ? 'Select tag' : 'Select tag',
    context: 'Context'
  };

  const defaultValues = useMemo(() => {
    const values = {
      status: 'active',
      name: '',
      pageType: null,
      tags: []
    };
    if (!isMobile) {
      values.url = '';
    }
    return values;
  }, [isMobile]);

  const methods = useForm({
    defaultValues,
    resolver: validationPage(pages, isMobile)
  });
  const {
    handleSubmit,
    reset,
    formState,
    register,
    watch,
    setValue,
    errors
  } = methods;
  console.log('🚀 ~ file: CreatePage.js ~ line 79 ~ errors', errors);
  const {mutateAsync: createPage} = useCreatePage();
  const {mutateAsync: createInventory} = useCreateInventory();

  useEffect(() => {
    register({name: 'tags'});
  }, [register]);

  const resetForm = useCallback(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    return () => {
      console.log('unmount CreatePage');
      resetForm();
    };
  }, [resetForm]);

  const onHandleSubmit = useCallback(
    async values => {
      console.log('🚀 ~ file: CreatePage.js ~ line 101 ~ values', values);
      const {name = null, url = null, tags: pageTags, status, context} = values;

      const pageData = {
        name: name?.trim(),
        url: url?.trim(),
        tags: Array.from(pageTags, tag => tag?.value),
        status,
        container_uuid: cid,
        source,
        context
      };
      console.log('🚀 ~ file: CreatePage.js ~ line 119 ~ pageData', pageData);

      /**
       * Khi tạo 1 page thì sẽ auto tạo 1 page event
       * sau đó sẽ tạo thêm default properties cho page event nữa
       * Các default props ở đây:
       * https://aicactus.atlassian.net/wiki/spaces/DMP/pages/54263829/Page
       */

      try {
        const {data} = await createPage(pageData);
        console.log('🚀 ~ file: CreatePage.js ~ line 123 ~ data', data);
        // const eventTypePageData = {
        //   status: 'active',
        //   type: EVENT_TYPES_VALUE.page,
        //   collectType: COLLECT_TYPES.auto,
        //   params: {
        //     category: null,
        //     name: pageData.name
        //   },
        //   name: pageData.name
        // };

        // try {
        //   const createdEvent = await createEvent({
        //     pageId: res.id,
        //     data: eventTypePageData
        //   });
        // } catch (error) {
        //   console.log('CreatePage -> error', error);
        //   // TODO - handle when create event failed
        //   ShowToast.error(error, {
        //     closeOnClick: true
        //   });
        // }

        toggle();
        ShowToast.success(
          `Create ${isMobile ? 'screen' : 'page'} successfully!`,
          {
            closeOnClick: true
          }
        );
        if (pageId) {
          navigate(`../${data?.uuid}`);
        } else {
          navigate(
            `/container/${cid}/${TAG_FROM_SOURCE[source]}/${data?.uuid}`
          );
        }

        dispatchCreatePage();
      } catch (error) {
        ShowToast.error(error, {
          closeOnClick: true
        });
      } finally {
        // setIsLoading(false);
      }
    },
    [
      cid,
      createPage,
      dispatchCreatePage,
      isMobile,
      navigate,
      pageId,
      source,
      toggle
    ]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off">
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <ModalHeader>{isMobile ? 'Screen' : 'Page'} information</ModalHeader>
          <ModalBody>
            <FormTextInput
              isRequired
              name="name"
              placeholder={`${formLabelsName.pageName}...`}
              label={formLabelsName.pageName}
              disable={formState.isSubmitting}
            />

            {isMobile ? null : (
              <FormTextInput
                isRequired
                name="url"
                placeholder={`${formLabelsName.pageURL}...`}
                label={formLabelsName.pageURL}
                disable={formState.isSubmitting}
              />
            )}

            <FormTextInput
              isRequired={false}
              name="context"
              placeholder={`${formLabelsName.context}...`}
              label={formLabelsName.context}
              disable={formState.isSubmitting}
            />

            <FormReactSelect
              required={false}
              name="tags"
              label={formLabelsName.pageTag}
              placeholder={formLabelsName.pageTagPlaceholder}
              optionLabelField="name"
              options={getContainerTags()}
              disabled={formState.isSubmitting}
              multiple={true}
            />

            <FormToggle
              name="status"
              defaultCheckedValue="active"
              label="Status"
              values={{
                checked: 'active',
                unChecked: 'inactive'
              }}
            />
          </ModalBody>
          <ModalFooter>
            <ButtonLoading
              loading={formState.isSubmitting}
              type="submit"
              className="ml-2 btn-primary"
              disabled={!formState.isDirty}
            >
              Save
            </ButtonLoading>
            <Button
              color="secondary"
              onClick={() => {
                resetForm();
                toggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </BlockUi>
      </form>
    </FormProvider>
  );
}

export default CreatePage;
