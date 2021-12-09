import PropTypes from 'prop-types';
import {useGetNativeAd} from 'queries/native-ad';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Card, CardBody, Modal, ModalHeader} from 'reactstrap';
import {
  toggleCreativeDetailDialog,
  useCreativeSelector
} from 'store/reducers/creative';

import {NativeAdForm} from '../NativeAdTab';

function NativeAdDetail(props) {
  const dispatch = useDispatch();

  const {
    selectedCreativeId,
    toggleDetailDialog,
    detailOf
  } = useCreativeSelector();

  const handleCloseModal = () => {
    dispatch(toggleCreativeDetailDialog(null));
  };

  const isOpen = detailOf === 'nativeAd' && toggleDetailDialog;

  return (
    <Modal
      backdrop
      unmountOnClose
      isOpen={isOpen}
      className="modal-dialog-centered shadow-none modal-size-1200"
    >
      <ModalHeader toggle={handleCloseModal}>Edit Native Banner</ModalHeader>
      <Card>
        <CardBody>
          <BannerDetailBody nativeAdId={selectedCreativeId} />
        </CardBody>
      </Card>
    </Modal>
  );
}

NativeAdDetail.propTypes = {};
NativeAdDetail.defaultProps = {};

export default NativeAdDetail;

function BannerDetailBody(props) {
  const {nativeAdId} = props;

  const {data: nativeAd, isFetching} = useGetNativeAd({nativeAdId});

  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      <NativeAdForm nativeAd={nativeAd} isCreate={false} />
    </>
  );
}

BannerDetailBody.propTypes = {
  nativeAdId: PropTypes.any
};
