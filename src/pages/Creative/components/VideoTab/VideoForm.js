import {BlockOverlay, CollapseBox} from 'components/common';
import PropTypes from 'prop-types';
import {useCreateVideo, useUpdateVideo} from 'queries/video';
import {GET_VIDEOS} from 'queries/video/constants';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button} from 'reactstrap';
import {
  dirtyForm,
  toggleCreateCreativeDialog,
  toggleCreativeDetailDialog
} from 'store/reducers/creative';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import VideoFiles from './VideoFiles';
import VideoInformationForm from './VideoInformationForm';
import {videoFormValuesToRepo, videoRepoToFormValues} from './dto';
import {createVideoFormResolver} from './validations';

const defaultValues = {
  // concept_id: 1,
  // dtype: 'video',
  // file_ids: [],
  name: '',
  click_url: '',
  width: '1',
  height: '1'
  // files: []
};

function VideoForm(props) {
  const {video: rawData, isCreate} = props;
  const {t} = useTranslation();
  const {conceptId} = useParams();
  const dispatch = useDispatch();
  const client = useQueryClient();

  const {mutateAsync: createVideoRequest} = useCreateVideo();
  const {mutateAsync: updateVideoRequest} = useUpdateVideo();

  const getDefaultValues = React.useMemo(() => {
    if (rawData) {
      return videoRepoToFormValues(rawData);
    }
    return defaultValues;
  }, [rawData]);

  const methods = useForm({
    defaultValues: getDefaultValues,
    resolver: createVideoFormResolver()
  });
  const {
    handleSubmit,
    formState: {isDirty}
  } = methods;

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(dirtyForm(isDirty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  const handleCloseDialog = () => {
    if (isCreate) {
      dispatch(toggleCreateCreativeDialog());
    } else {
      dispatch(toggleCreativeDetailDialog(null));
    }
  };

  const handleError = err => {
    setIsLoading(false);
    ShowToast.error(err?.msg);
  };

  const handleSuccess = (msg = 'Create Video successfully!') => {
    ShowToast.success(msg);
  };

  const onSubmit = async values => {
    let requestData = {};
    if (values?.files?.length) {
      const fileIds = values.files.map(file => file?.file?.file?.uuid);
      if (fileIds?.every(fileId => fileId !== undefined)) {
        requestData = videoFormValuesToRepo(values, conceptId, fileIds);
      } else {
        requestData = videoFormValuesToRepo(values, conceptId, []);
      }
    } else {
      requestData = videoFormValuesToRepo(values, conceptId);
    }
    setIsLoading(true);

    if (isCreate) {
      try {
        await createVideoRequest(requestData);
        setIsLoading(false);
        handleSuccess();
        handleCloseDialog();
        client.invalidateQueries([GET_VIDEOS]);
      } catch (error) {
        handleError(error);
      }
    } else {
      // update
      try {
        await updateVideoRequest({videoId: rawData.uuid, data: requestData});
        setIsLoading(false);
        handleSuccess('Update Video successfully!');
        handleCloseDialog();
        client.invalidateQueries([GET_VIDEOS]);
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="video-info-form"
          name="video-info-form"
        >
          {isLoading && <BlockOverlay />}

          <CollapseBox open title="Information">
            <VideoInformationForm defaultValues={getDefaultValues} />
          </CollapseBox>

          <VideoFiles videoId={rawData?.uuid} />
        </form>
      </FormProvider>

      <div className="d-flex justify-content-end">
        <Button
          color="secondary"
          onClick={handleCloseDialog}
          disabled={isLoading}
        >
          Close
        </Button>
        <Button
          color="primary"
          disabled={!isDirty}
          type="submit"
          className="ml-2"
          form="video-info-form"
        >
          {t('save')}
        </Button>
      </div>
    </>
  );
}

VideoForm.propTypes = {
  video: PropTypes.any,
  isCreate: PropTypes.bool
};
VideoForm.defaultProps = {
  isCreate: true
};

export default VideoForm;