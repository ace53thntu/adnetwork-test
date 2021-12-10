import PropTypes from 'prop-types';
import {useGetVideo} from 'queries/video';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Card, CardBody, Modal, ModalHeader} from 'reactstrap';
import {
  toggleCreativeDetailDialog,
  useCreativeSelector
} from 'store/reducers/creative';

import VideoForm from '../VideoTab/VideoForm';

function VideoDetail(props) {
  const dispatch = useDispatch();

  const {
    selectedCreativeId,
    toggleDetailDialog,
    detailOf
  } = useCreativeSelector();

  const handleCloseModal = () => {
    dispatch(toggleCreativeDetailDialog(null));
  };

  const isOpen = detailOf === 'video' && toggleDetailDialog;

  return (
    <Modal
      backdrop
      unmountOnClose
      isOpen={isOpen}
      className="modal-dialog-centered shadow-none modal-size-1200"
    >
      <ModalHeader toggle={handleCloseModal}>Edit Video Banner</ModalHeader>
      <Card>
        <CardBody>
          <BannerDetailBody videoId={selectedCreativeId} />
        </CardBody>
      </Card>
    </Modal>
  );
}

VideoDetail.propTypes = {};
VideoDetail.defaultProps = {};

export default VideoDetail;

function BannerDetailBody(props) {
  const {videoId} = props;

  const {data: video, isFetching} = useGetVideo(videoId);

  if (isFetching) return <div>Loading...</div>;

  return <VideoForm video={video} isCreate={false} />;
}

BannerDetailBody.propTypes = {
  videoId: PropTypes.any
};
