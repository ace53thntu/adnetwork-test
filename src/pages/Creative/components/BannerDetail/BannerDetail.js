// import PropTypes from 'prop-types';
import {useGetCreative} from 'queries/creative';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Card, CardBody, Modal, ModalHeader} from 'reactstrap';
import {
  toggleCreativeDetailDialog,
  useCreativeSelector
} from 'store/reducers/creative';

import {BannerForm} from '../BannerForm';

function BannerDetail(props) {
  const dispatch = useDispatch();

  const {selectedCreativeId, toggleDetailDialog} = useCreativeSelector();

  const handleCloseModal = () => {
    dispatch(toggleCreativeDetailDialog(null));
  };

  return (
    <Modal
      backdrop
      unmountOnClose
      isOpen={toggleDetailDialog}
      className="modal-dialog-centered shadow-none modal-size-1200"
    >
      <ModalHeader toggle={handleCloseModal}>Edit Creative</ModalHeader>
      <Card>
        <CardBody>
          <BannerDetailBody creativeId={selectedCreativeId} />
        </CardBody>
      </Card>
    </Modal>
  );
}

BannerDetail.propTypes = {};
BannerDetail.defaultProps = {};

export default BannerDetail;

function BannerDetailBody(props) {
  const {creativeId} = props;

  const {data: creative, isFetching} = useGetCreative({
    creativeId: creativeId,
    enabled: !!creativeId
  });

  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      <BannerForm creative={creative} />
    </>
  );
}
