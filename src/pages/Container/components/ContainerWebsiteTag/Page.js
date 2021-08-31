//---> Build-in Modules
import React, {useCallback, useEffect, useRef, useState} from 'react';

//---> External Modules
import BlockUi from 'react-block-ui';
import {useForm, FormProvider} from 'react-hook-form';
import {Row, Col, Card, CardBody, CardTitle, CardHeader} from 'reactstrap';
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {validationPage} from './validations';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {useEditPage} from 'queries/page';
import {getContainerTags} from 'pages/Container/constants';

function Page({pageTypes = [], pageTags = [], page}) {
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

  const pages = [];

  const filteredPages = useRef(
    pages?.length ? pages?.filter(p => p.id !== page.id) : []
  );

  const methods = useForm({
    defaultValues: {
      status,
      name: page?.name ?? '',
      url: page?.url ?? '',
      tags: pageTagRef.current || [],
      context: page?.context ?? ''
    },
    resolver: validationPage(filteredPages.current)
  });
  const {handleSubmit, formState, reset, register} = methods;

  const {isDirty = false} = formState;

  const {mutateAsync: updatePage} = useEditPage();

  // local states
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register({name: 'tags'});
  }, [register]);

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
