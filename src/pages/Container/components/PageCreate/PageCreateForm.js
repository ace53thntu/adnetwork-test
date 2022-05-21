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
import BlockUi from 'react-block-ui';
import {ContainerAPIRequest} from 'api/container.api';
import {useQueryClient} from 'react-query';
import {GET_CONTAINER} from 'queries/container/constants';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {GET_PAGES} from 'queries/page/constants';
import {PageAPIRequest} from 'api/page.api';
import {TAG_FROM_SOURCE} from 'constants/container';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {getResponseData} from 'utils/helpers/misc.helpers';

function PageCreateForm({pageTags = []}) {
  const queryCache = useQueryClient();

  const dispatch = useDispatch();
  const {cid, tag: source} = useParams();

  const navigate = useNavigate();
  const {data: pages = []} = useGetPagesByContainer(cid);
  const {selectedSource} = useContainerSelector();
  const pageSource = source || selectedSource;

  const isMobile = source
    ? source === 'ios' ||
      source === 'android' ||
      source === 'androidtv' ||
      source === 'appletv'
    : selectedSource === 'ios' ||
      selectedSource === 'android' ||
      selectedSource === 'androidtv' ||
      selectedSource === 'appletv';
  const webTvSource = source || selectedSource;

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
    resolver: validationPage(pages, isMobile, webTvSource)
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

        const pageRes = await PageAPIRequest.getAllPage({
          params: {
            container_uuid: cid,
            source: pageSource,
            limit: 1000,
            page: 1
          },
          options: {
            isResponseAll: IS_RESPONSE_ALL
          }
        });
        const pagesData = getResponseData(pageRes, IS_RESPONSE_ALL);

        const container = containerRes.data;
        container.source = pageSource;
        container.id = container.uuid;
        const pageId = data?.uuid;

        const pages = pagesData?.map(item => {
          return {
            id: item.uuid,
            name: item.name,
            children: [],
            numChildren: 0,
            page: 0,
            expanded: false,
            selected: false,
            parentId: pageSource,
            isPage: true,
            containerId: container?.uuid
          };
        });

        queryCache.setQueryData([GET_CONTAINER, cid], containerRes.data);
        queryCache.invalidateQueries([GET_PAGES, cid]);
        dispatch(setContainerRedux(container, pageSource, pageId, pages));
        toggleModal();

        navigate(`/container/${cid}/${TAG_FROM_SOURCE[pageSource]}/${pageId}`);
      } catch (error) {
        ShowToast.error(error?.msg, {
          closeOnClick: true
        });
      } finally {
        // setIsLoading(false);
      }
    },
    [
      cid,
      pageSource,
      createPage,
      isMobile,
      queryCache,
      dispatch,
      toggleModal,
      navigate
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

            {isMobile ||
            source === 'webtv' ||
            selectedSource === 'webtv' ? null : (
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
