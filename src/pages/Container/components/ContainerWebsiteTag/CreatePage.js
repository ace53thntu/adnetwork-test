import React, {useCallback, useEffect, useMemo} from 'react';
import BlockUi from 'react-block-ui';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {validationPage} from './validations';
import useCreatePage from '../../hooks/useCreatePage';
import {useCreateProperty} from '../../hooks/useCreateEventProperty';
import {useContainerStore} from '../../context';
import {SOURCE_FROM_TAG, TAG_FROM_SOURCE} from '../ContainerTree/constants';
import {
  DEFAULT_EVENT_PROPERTIES,
  EVENT_TYPES_VALUE
} from 'pages/Container/constants';
import {COLLECT_TYPES} from './constants';
import useCreateEvent from 'pages/Container/hooks/useCreateEvent';
import {useGetPages} from 'pages/Container/hooks/usePages';
import useCreatePageTag from 'pages/Container/hooks/useCreatePageTag';
import {
  FormReactSelect,
  FormTextInput,
  FormToggle,
  SelectCreatable
} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {ShowToast} from 'utils/helpers/showToast.helpers';

function CreatePage({
  toggle,
  pageTypes = [],
  pageTags = [],
  source = null,
  shouldRefetch = false
}) {
  const {cid, pageId, tag} = useParams();
  const navigate = useNavigate();
  const {createPage: dispatchCreatePage} = useContainerStore();
  const {data: pages = []} = useGetPages({
    containerId: cid,
    source: source || SOURCE_FROM_TAG[tag]
  });

  const isMobile = source === 'ios' || source === 'android';

  const formLabelsName = {
    pageName: isMobile ? 'Screen name' : 'Page name',
    pageURL: 'Page URL',
    pageType: isMobile ? 'Screen type' : 'Page type',
    pageTypePlaceholder: isMobile
      ? 'Select a screen type'
      : 'Select a page type',
    pageTag: isMobile ? 'Screen tags' : 'Page tags',
    pageTagPlaceholder: isMobile ? 'Select screen tags' : 'Select page tags'
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
  const [createPage] = useCreatePage(shouldRefetch);
  const [createEvent] = useCreateEvent();
  const [createPageTag] = useCreatePageTag();
  const [createProperty] = useCreateProperty();

  useEffect(() => {
    register({name: 'tags'});
  }, [register]);

  const selectedTags = watch('tags');

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
      const {
        name = null,
        url = null,
        pageType: pageTypeId,
        tags: pageTags,
        status
      } = values;

      const pageData = {
        name: name?.trim(),
        url: url?.trim(),
        pageType: pageTypeId.id,
        tags: Array.from(pageTags, tag => ({
          id: tag.id
        })),
        status,
        containerId: cid,
        source
      };

      /**
       * Khi tạo 1 page thì sẽ auto tạo 1 page event
       * sau đó sẽ tạo thêm default properties cho page event nữa
       * Các default props ở đây:
       * https://aicactus.atlassian.net/wiki/spaces/DMP/pages/54263829/Page
       */

      try {
        const res = await createPage({data: pageData});
        const eventTypePageData = {
          status: 'active',
          type: EVENT_TYPES_VALUE.page,
          collectType: COLLECT_TYPES.auto,
          params: {
            category: null,
            name: pageData.name
          },
          name: pageData.name
        };

        try {
          const createdEvent = await createEvent({
            pageId: res.id,
            data: eventTypePageData
          });
          if (isMobile) {
            await createProperty({eventId: createdEvent.id, name: 'name'});
          } else {
            let promises = [];
            DEFAULT_EVENT_PROPERTIES.forEach(prop =>
              promises.push(
                createProperty({eventId: createdEvent.id, name: prop})
              )
            );
            await Promise.all(promises);
          }
        } catch (error) {
          console.log('CreatePage -> error', error);
          // TODO - handle when create event failed
          ShowToast.error(error, {
            closeOnClick: true
          });
        }

        toggle();
        ShowToast.success(
          `Create ${isMobile ? 'screen' : 'page'} successfully!`,
          {
            closeOnClick: true
          }
        );
        if (pageId) {
          navigate(`../${res.id}`);
        } else {
          navigate(`/container/${cid}/${TAG_FROM_SOURCE[source]}/${res.id}`);
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
      createEvent,
      createPage,
      createProperty,
      dispatchCreatePage,
      isMobile,
      navigate,
      pageId,
      source,
      toggle
    ]
  );

  const onHandleCreateTag = async ({
    inputValue,
    setIsLoading: setIsLoadingCreateTag,
    createOption,
    setOptions,
    setValue: changeValue,
    options,
    selected = []
  }) => {
    setIsLoadingCreateTag(true);
    try {
      const {id: tagId} = await createPageTag({tag: inputValue});
      const newOption = createOption(tagId, inputValue);
      setOptions([...options, newOption]);
      changeValue([...selected, newOption]);
      setValue('tags', [...selected, newOption], {
        shouldDirty: true,
        shouldValidate: true
      });
    } catch (error) {
      console.log('onHandleCreateTag error', error);
    } finally {
      setIsLoadingCreateTag(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
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

            <FormReactSelect
              required
              name="pageType"
              label={formLabelsName.pageType}
              placeholder={formLabelsName.pageTypePlaceholder}
              optionLabelField="name"
              options={pageTypes}
              disabled={formState.isSubmitting}
            />

            <SelectCreatable
              data={pageTags}
              labelKey="tag"
              onCreate={onHandleCreateTag}
              selectedValues={selectedTags}
              setFormValue={setValue}
              name="tags"
              placeholder={formLabelsName.pageTagPlaceholder}
              label={formLabelsName.pageTag}
              errors={errors}
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
