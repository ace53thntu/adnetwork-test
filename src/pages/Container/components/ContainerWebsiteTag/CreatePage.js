import React, {useCallback, useEffect, useMemo} from 'react';
import BlockUi from 'react-block-ui';
import {useParams, useNavigate} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {validationPage} from './validations';
import {TAG_FROM_SOURCE} from '../ContainerTree/constants';
import {getContainerTags} from 'pages/Container/constants';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {ButtonLoading} from 'components/common';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreatePage, useGetPagesByContainer} from 'queries/page';

function CreatePage({
  toggle,
  pageTags = [],
  source = null,
  shouldRefetch = false
}) {
  const {cid, pageId} = useParams();
  const navigate = useNavigate();
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
  const {handleSubmit, reset, formState, register} = methods;
  const {mutateAsync: createPage} = useCreatePage();

  useEffect(() => {
    register({name: 'tags'});
  }, [register]);

  const resetForm = useCallback(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const onHandleSubmit = useCallback(
    async values => {
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

      try {
        const {data} = await createPage(pageData);
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
      } catch (error) {
        ShowToast.error(error, {
          closeOnClick: true
        });
      } finally {
        // setIsLoading(false);
      }
    },
    [cid, createPage, isMobile, navigate, pageId, source, toggle]
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
