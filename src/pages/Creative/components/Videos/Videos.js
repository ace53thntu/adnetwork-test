import {DialogConfirm, SwiperList} from 'components/common';
// import PropTypes from 'prop-types';
import {useDeleteVideo, useVideos} from 'queries/video';
import {GET_VIDEOS} from 'queries/video/constants';
import * as React from 'react';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Col, Row} from 'reactstrap';
import {
  toggleCreateCreativeDialog,
  toggleCreativeDetailDialog
} from 'store/reducers/creative';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {NotFound} from '../NotFound';
import {SwiperItem} from '../SwiperItem';
import {VideoDetail} from '../VideoDetail';

function Videos(props) {
  const dispatch = useDispatch();
  const client = useQueryClient();
  const {conceptId} = useParams();

  const params = React.useMemo(() => {
    return {
      concept_uuid: conceptId,
      status: 'active',
      sort_by: 'updated_at',
      sort: 'desc'
    };
  }, [conceptId]);

  const {data: res} = useVideos({params});
  const {mutateAsync: deleteVideoRequest} = useDeleteVideo();

  const videos = res;

  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setDeleteId(null);
    setIsLoading(false);
  };

  const handleDeleteVideo = videoId => {
    setDeleteId(videoId);
    setIsOpen(true);
  };

  const handleClickName = React.useCallback(
    video => {
      dispatch(toggleCreativeDetailDialog(video.uuid, 'video'));
    },
    [dispatch]
  );

  const handleAgree = async () => {
    setIsLoading(true);

    try {
      await deleteVideoRequest(deleteId);
      ShowToast.success('Remove Video successfully!');
      handleClose();
      client.invalidateQueries([GET_VIDEOS, params]);
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.message);
    }
  };

  const handleOpenCreateCreativeDialog = () => {
    dispatch(toggleCreateCreativeDialog());
  };

  const swiperData = React.useMemo(() => {
    return videos?.map((video, idx) => {
      const {name, files = []} = video;

      const foundImgOrVideoAsset =
        files?.find(file => file?.type === 'VIDEO') ?? null;

      return (
        <SwiperItem
          isVideo
          name={name}
          file={foundImgOrVideoAsset || files?.[0]}
          item={video}
          handleClickName={handleClickName}
          onDelete={() => handleDeleteVideo(video.uuid)}
        />
      );
    });
  }, [handleClickName, videos]);

  return (
    <>
      <Row>
        <Col>
          <h5>Video</h5>
        </Col>
      </Row>
      {swiperData?.length ? (
        <>
          <Row>
            <Col>
              <SwiperList slides={swiperData} />
            </Col>
          </Row>
        </>
      ) : (
        <NotFound entity="Video" onClick={handleOpenCreateCreativeDialog} />
      )}

      <DialogConfirm
        open={isOpen}
        isLoading={isLoading}
        handleClose={handleClose}
        handleAgree={handleAgree}
      />

      <VideoDetail />
    </>
  );
}

Videos.propTypes = {};
Videos.defaultProps = {};

export default Videos;
