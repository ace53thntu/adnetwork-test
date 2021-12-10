import {
  setContainerRedux,
  toggleCreatePageModalRedux,
  useContainerSelector
} from 'store/reducers/container';
import PropTypes from 'prop-types';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {useNavigate, useParams} from 'react-router';
import {Button, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {validationPage} from './validations';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ButtonLoading} from 'components/common';
import {useCreatePage, useGetPagesByContainer} from 'queries/page';
import {useDispatch} from 'react-redux';
import {TAG_FROM_SOURCE} from '../ContainerTree/constants';
import BlockUi from 'react-block-ui';
import {ContainerAPIRequest} from 'api/container.api';
import {useQueryClient} from 'react-query';
import {GET_CONTAINER} from 'queries/container/constants';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {GET_PAGES} from 'queries/page/constants';

function PageCreateForm({pageTags = []}) {
  const queryCache = useQueryClient();

  const dispatch = useDispatch();
  const {cid, tag: source} = useParams();

  const navigate = useNavigate();
  const {data: pages = []} = useGetPagesByContainer(cid);
  const {selectedSource} = useContainerSelector();
  const pageSource = source || selectedSource;

  const isMobile = source
    ? source === 'ios' || source === 'android'
    : selectedSource === 'ios' || selectedSource === 'android';

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

  const defaultValues = React.useMemo(() => {
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
  const {mutateAsync: createPage} = useCreatePage(cid);

  React.useEffect(() => {
    register({name: 'tags'});
  }, [register]);

  const resetForm = React.useCallback(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  React.useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const toggleModal = React.useCallback(() => {
    dispatch(toggleCreatePageModalRedux(pageSource));
  }, [dispatch, pageSource]);

  const onHandleSubmit = React.useCallback(
    async values => {
      const {name = null, url = null, tags: pageTags, status, context} = values;
      const pageData = {
        name: name?.trim(),
        url: url?.trim(),
        tags: Array.from(pageTags, tag => tag?.value),
        status,
        container_uuid: cid,
        source: pageSource,
        context
      };

      try {
        const {data} = await createPage(pageData);
        ShowToast.success(
          `Create ${isMobile ? 'screen' : 'page'} successfully!`,
          {
            closeOnClick: true
          }
        );
        const containerRes = await ContainerAPIRequest.getContainer({
          id: cid,
          options: {}
        });

        queryCache.setQueryData([GET_CONTAINER, cid], containerRes.data);
        queryCache.invalidateQueries([GET_PAGES, cid]);
        toggleModal();
        dispatch(setContainerRedux(containerRes.data, pageSource, data.uuid));
        navigate(
          `/container/${cid}/${TAG_FROM_SOURCE[pageSource]}/${data?.uuid}`
        );
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
      dispatch,
      isMobile,
      navigate,
      queryCache,
      toggleModal,
      pageSource
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
              options={pageTags}
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
                toggleModal();
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

PageCreateForm.propTypes = {
  pageTags: PropTypes.array
};

PageCreateForm.defaultProps = {
  pageTags: []
};

export default PageCreateForm;
