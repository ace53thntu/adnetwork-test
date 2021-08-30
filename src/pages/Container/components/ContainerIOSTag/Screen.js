import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import BlockUi from 'react-block-ui';
import {useForm, FormProvider} from 'react-hook-form';
import {Row, Col, Card, CardBody, CardTitle, CardHeader} from 'reactstrap';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

// components
// import {FormTextInput, Forms, SelectCreatable, LoadingButton} from 'components';

// queries, mutations
import {validationPage} from '../ContainerWebsiteTag/validations';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {getContainerTags} from 'pages/Container/constants';
import {useEditPage} from 'queries/page';

function Screen({pageTypes = [], pageTags = [], page}) {
  const {cid: containerId} = useParams();
  const {status} = page;

  const pageTagRef = useRef(
    pageTags
      .filter(tg => {
        if (page?.tags) {
          return page.tags.includes(tg?.value);
        }
        return false;
      })
      .map(item => ({id: item.value, label: item.label, value: item.value}))
  );

  // const {data: pages} = useGetPages({
  //   containerId,
  //   source: SOURCE_FROM_TAG[tag]
  // });
  const pages = useCallback(() => [], []);

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
      tags: pageTagRef.current,
      context: page?.context ?? ''
    },
    resolver: validationPage(filteredPages, true)
  });
  const {handleSubmit, formState, register, reset} = methods;

  const {mutateAsync: updatePage} = useEditPage();

  useEffect(() => {
    register({name: 'tags'});
  }, [register]);

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

              <FormTextInput
                isRequired={false}
                name="context"
                placeholder="Context..."
                label="Context"
                disable={formState.isSubmitting}
              />

              <FormReactSelect
                required={false}
                name="tags"
                label="Tags"
                placeholder="Select tags"
                optionLabelField="name"
                options={getContainerTags()}
                disabled={formState.isSubmitting}
                multiple={true}
              />

              <Row>
                <Col sm={12}>
                  <div className="d-flex justify-content-end">
                    <ButtonLoading
                      type="submit"
                      className="ml-2"
                      color="primary"
                      disabled={!formState.isDirty || formState.isSubmitting}
                      loading={formState.isSubmitting}
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
