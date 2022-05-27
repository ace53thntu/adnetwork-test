import {BlockOverlay, CollapseBox} from 'components/common';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';
import PropTypes from 'prop-types';
import {useCreateVideo, useUpdateVideo} from 'queries/video';
import {GET_VIDEOS} from 'queries/video/constants';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {useCommonSelector} from 'store/reducers/common';
import {
  dirtyForm,
  toggleCreateCreativeDialog,
  toggleCreativeDetailDialog,
  useCreativeSelector
} from 'store/reducers/creative';
import {difference} from 'utils/helpers/difference.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {PLATFORM_OPTIONS, THIRD_PARTY_TAG_TYPES} from '../BannerForm/constants';
import {useCalculateAdSize} from '../BannerForm/hooks';
import Report from '../Report';
import {Trackers} from '../Trackers';
import VideoFiles from './VideoFiles';
import VideoInformationForm from './VideoInformationForm';
import {VideoServeTypes, VideoTypes} from './constants';
import {videoFormValuesToRepo, videoRepoToFormValues} from './dto';
import {createVideoFormResolver} from './validations';

const defaultValues = {
  // concept_id: 1,
  // dtype: 'video',
  // file_ids: [],
  name: '',
  click_url: '',
  width: '',
  height: '',
  type: VideoServeTypes[0],
  linearity: VideoTypes[0],
  platform: PLATFORM_OPTIONS[0],
  ad_size_format: null,
  video_metadata: '',
  tags: [],
  third_party_tag: '',
  third_party_tag_type: THIRD_PARTY_TAG_TYPES[0]
  // files: []
};

function VideoForm(props) {
  const {video: rawData, isCreate} = props;
  const {t} = useTranslation();
  const {conceptId} = useParams();
  const {selectedAdvertiserId} = useCreativeSelector();
  const dispatch = useDispatch();
  const client = useQueryClient();
  const {isUploading} = useCommonSelector();

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
    formState: {isDirty},
    watch,
    setValue
  } = methods;

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(dirtyForm(isDirty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  useCalculateAdSize({
    watch,
    setValue
  });

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
    setIsLoading(true);

    if (isCreate) {
      let requestData = {};
      if (values?.files?.length) {
        const filtered = values.files.filter(item => item.file);
        const fileIds = filtered.map(file => file.file.uuid);
        requestData = videoFormValuesToRepo(values, conceptId, fileIds);
      } else {
        requestData = videoFormValuesToRepo(values, conceptId, []);
      }

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
      const diff = difference(values, getDefaultValues);

      let fileIds = [];
      if (values?.files?.length) {
        const filtered = values.files.filter(item => item.file);
        fileIds = filtered.map(file => file.file.uuid);
      }
      const requestBody = videoFormValuesToRepo(diff, conceptId, fileIds, true);

      try {
        await updateVideoRequest({videoId: rawData.uuid, data: requestBody});
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

      {!isCreate && (
        <>
          <hr />
          <Row>
            <Col>
              <Trackers referenceId={rawData?.uuid} referenceType="video" />
            </Col>
          </Row>
          <hr />
        </>
      )}

      {/* BEGIN: Report */}
      {rawData?.uuid && (
        <Report
          entityId={rawData?.uuid}
          entity={EntityTypes.VIDEO}
          ownerId={selectedAdvertiserId}
          ownerRole={USER_ROLE.ADVERTISER}
        />
      )}

      {/* END: Report */}

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
          disabled={!isDirty || isUploading}
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
