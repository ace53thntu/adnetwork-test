import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import BlockUi from 'react-block-ui';
import {useForm, FormProvider} from 'react-hook-form';
import {Row, Col, Card, CardBody, CardTitle, CardHeader} from 'reactstrap';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

// components
// import {FormTextInput, Forms, SelectCreatable, LoadingButton} from 'components';

// queries, mutations
import useUpdatePage from 'pages/Container/hooks/useUpdatePage';

import {validationPage} from '../ContainerWebsiteTag/validations';
import {useGetPages} from 'pages/Container/hooks/usePages';
import {SOURCE_FROM_TAG} from '../ContainerTree/constants';
import useCreatePageTag from 'pages/Container/hooks/useCreatePageTag';
import {
  FormReactSelect,
  FormTextInput,
  FormToggle,
  SelectCreatable
} from 'components/forms';
import {ButtonLoading} from 'components/common';

function Screen({pageTypes = [], pageTags = [], page}) {
  const {cid: containerId, tag} = useParams();
  const {status} = page;

  const pageTypeRef = useRef(pageTypes.find(type => type.id === page.pageType));
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

  const filteredPages = useMemo(() => {
    if (pages?.length) {
      return pages.filter(p => p.id !== page.id);
    }
    return [];
  }, [page.id, pages]);

  const methods = useForm({
    defaultValues: {
      status,
      name: page?.name ?? '',
      pageType: pageTypeRef.current,
      tags: pageTagRef.current
    },
    resolver: validationPage(filteredPages, true)
  });
  const {
    handleSubmit,
    formState,
    errors,
    setValue,
    register,
    watch,
    reset
  } = methods;

  const [updatePage] = useUpdatePage();
  const [createPageTag] = useCreatePageTag();

  useEffect(() => {
    register({name: 'tags'});
  }, [register]);

  const selectedTags = watch('tags');

  const onHandleSubmit = useCallback(
    async values => {
      const {
        name: pageName,
        pageType: pageTypeId,
        tags: pageTags,
        status: pageStatus
      } = values;

      const updatedPage = {
        name: pageName?.trim(),
        pageType: pageTypeId.id,
        tags: Array.from(pageTags, tag => ({
          id: tag.id
        })),
        status: pageStatus,
        containerId,
        source: page.source
      };
      try {
        await updatePage({pageId: page.id, data: updatedPage});
        reset({
          name: pageName,
          pageType: pageTypeId,
          tags: pageTags,
          status: pageStatus
        });
        toast.success('Update screen successfully!', {
          closeOnClick: true
        });
      } catch (error) {
        toast.error(error, {
          closeOnClick: true
        });
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
    selected
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
      <BlockUi tag="div" blocking={formState.isSubmitting}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Card className="main-card mb-3">
            <CardHeader className="border-0">
              <CardTitle>Screen Information</CardTitle>
              <div className="btn-actions-pane-right">
                <FormToggle
                  name="status"
                  defaultCheckedValue="active"
                  label="Status"
                  values={{
                    checked: 'active',
                    unChecked: 'inactive'
                  }}
                  disabled={formState.isSubmitting}
                />
              </div>
            </CardHeader>
            <CardBody className="pt-0 pb-3">
              <FormTextInput
                isRequired
                name="name"
                placeholder="Screen name..."
                label="Screen name"
                disable={formState.isSubmitting}
              />

              <FormReactSelect
                required
                name="pageType"
                label="Screen type"
                placeholder="Select a screen type..."
                optionLabelField="name"
                options={pageTypes}
                disabled={formState.isSubmitting}
                defaultValue={pageTypeRef.current}
              />

              {/* <Forms.FormReactSelect
                multiple
                name="tags"
                label="Screen tags"
                placeholder="Select screen tags..."
                optionLabelField="tag"
                options={pageTags}
                disabled={formState.isSubmitting}
                defaultValue={pageTagRef.current}
              /> */}

              <SelectCreatable
                data={pageTags}
                labelKey="tag"
                onCreate={onHandleCreateTag}
                selectedValues={selectedTags}
                setFormValue={setValue}
                name="tags"
                placeholder="Select screen tags..."
                label="Screen tags"
                errors={errors}
              />

              <Row>
                <Col sm={12}>
                  <div className="d-flex justify-content-end">
                    <ButtonLoading
                      type="submit"
                      className="ml-2"
                      color="primary"
                      disabled={!formState.isDirty || formState.isSubmitting}
                      isLoading={formState.isSubmitting}
                    >
                      Save Screen
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

export default Screen;
