import React, {useCallback, useEffect, useRef, useState} from 'react';
import BlockUi from 'react-block-ui';
import {useForm, FormProvider} from 'react-hook-form';
import {Row, Col, Card, CardBody, CardTitle, CardHeader} from 'reactstrap';
import {useParams} from 'react-router-dom';

// components

// queries, mutations
import useUpdatePage from 'pages/Container/hooks/useUpdatePage';

import {validationPage} from './validations';
import {useGetPages} from 'pages/Container/hooks/usePages';
import {SOURCE_FROM_TAG} from '../ContainerTree/constants';
import useCreatePageTag from 'pages/Container/hooks/useCreatePageTag';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {
  FormReactSelect,
  FormTextInput,
  FormToggle,
  SelectCreatable
} from 'components/forms';
import {ButtonLoading} from 'components/common';

function Page({pageTypes = [], pageTags = [], page}) {
  const {cid: containerId, tag} = useParams();
  const {status, pageType: pageTypeRes} = page;

  const pageTypeRef = useRef(pageTypes.find(type => type.id === pageTypeRes));
  const pageTagRef = useRef(
    pageTags
      .filter(tg => {
        if (page?.tags) {
          return page.tags.map(tag => tag.id).includes(tg.id);
        }
        return false;
      })
      .map(item => ({id: item.id, label: item.tag, value: item.id}))
  );

  const {data: pages} = useGetPages({
    containerId,
    source: SOURCE_FROM_TAG[tag]
  });

  const filteredPages = useRef(
    pages?.length ? pages.filter(p => p.id !== page.id) : []
  );

  const methods = useForm({
    defaultValues: {
      status,
      name: page?.name ?? '',
      url: page?.url ?? '',
      pageType: pageTypeRef.current,
      tags: pageTagRef.current
    },
    resolver: validationPage(filteredPages.current)
  });
  const {
    handleSubmit,
    formState,
    reset,
    register,
    watch,
    setValue,
    errors
  } = methods;

  const {isDirty = false} = formState;

  const [updatePage] = useUpdatePage();
  const [createPageTag] = useCreatePageTag();

  // local states
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register({name: 'tags'});
  }, [register]);

  const selectedTags = watch('tags');

  const onHandleSubmit = useCallback(
    async values => {
      const {
        name: pageName,
        url: pageURL,
        pageType: pageTypeId,
        tags: pageTags,
        status: pageStatus
      } = values;

      const updatedPage = {
        name: pageName.trim(),
        url: pageURL.trim(),
        pageType: pageTypeId.id,
        tags: Array.from(pageTags, tag => ({
          id: tag.id
        })),
        status: pageStatus,
        containerId: containerId,
        source: page.source
      };

      setIsLoading(true);
      try {
        await updatePage({pageId: page.id, data: updatedPage});
        reset({
          name: pageName,
          url: pageURL,
          pageType: pageTypeId,
          tags: pageTags,
          status: pageStatus
        });
        ShowToast.success('Update page successfully!', {
          closeOnClick: true
        });
      } catch (error) {
        ShowToast.error(error, {
          closeOnClick: true
        });
      } finally {
        setIsLoading(false);
      }
    },
    [containerId, page.id, page.source, reset, updatePage]
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
      <BlockUi tag="div" blocking={isLoading}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Card className="main-card mb-3">
            <CardHeader className="border-0">
              <CardTitle>Page Information</CardTitle>
              <div className="btn-actions-pane-right">
                <FormToggle
                  name="status"
                  defaultCheckedValue="active"
                  label="Status"
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                />
              </div>
            </CardHeader>
            <CardBody className="pt-0 pb-3">
              <FormTextInput
                isRequired
                name="name"
                placeholder="Page name..."
                label="Page name"
                disable={isLoading}
              />

              <FormTextInput
                isRequired
                name="url"
                placeholder="Page URL..."
                label="Page URL"
                disable={isLoading}
              />

              <FormReactSelect
                required
                name="pageType"
                label="Page type"
                placeholder="Select a page type..."
                optionLabelField="name"
                options={pageTypes}
                defaultValue={pageTypeRef.current}
              />

              <SelectCreatable
                data={pageTags}
                labelKey="tag"
                onCreate={onHandleCreateTag}
                selectedValues={selectedTags}
                setFormValue={setValue}
                name="tags"
                placeholder="Select page tags..."
                label="Page tags"
                errors={errors}
              />

              <Row>
                <Col sm={12}>
                  <div className="d-flex justify-content-end">
                    <ButtonLoading
                      type="submit"
                      className="ml-2"
                      color="primary"
                      disabled={!isDirty || isLoading}
                      isLoading={isLoading}
                    >
                      Save Page
                    </ButtonLoading>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </form>
      </BlockUi>
    </FormProvider>
  );
}

export default Page;
