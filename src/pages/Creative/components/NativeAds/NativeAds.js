import {DialogConfirm, SwiperList} from 'components/common';
// import PropTypes from 'prop-types';
import {useDeleteNativeAd, useGetNativeAds} from 'queries/native-ad';
import {GET_NATIVE_ADS} from 'queries/native-ad/constants';
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

import {NativeAdDetail} from '../NativeAdDetail';
import {NotFound} from '../NotFound';
import {SwiperItem} from '../SwiperItem';

function NativeAds(props) {
  const {conceptId} = useParams();
  const client = useQueryClient();
  const dispatch = useDispatch();

  const {mutateAsync: deleteNativeAdRequest} = useDeleteNativeAd();

  const params = React.useMemo(() => {
    return {
      concept_uuid: conceptId,
      status: 'active',
      sort_by: 'updated_at',
      sort: 'desc'
    };
  }, [conceptId]);

  const {data: res} = useGetNativeAds({
    params
  });
  const nativeAds = res;

  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setDeleteId(null);
    setIsLoading(false);
  };

  const handleDeleteNativeAd = nativeAdId => {
    setDeleteId(nativeAdId);
    setIsOpen(true);
  };

  const handleAgree = async () => {
    setIsLoading(true);

    try {
      await deleteNativeAdRequest(deleteId);
      ShowToast.success('Remove Native Banner successfully!');
      handleClose();
      client.invalidateQueries([GET_NATIVE_ADS, params]);
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.message);
    }
  };

  const handleOpenCreativeDetailDialog = nativeAd => {
    dispatch(toggleCreativeDetailDialog(nativeAd.uuid, 'nativeAd'));
  };

  const handleOpenCreateCreativeDialog = () => {
    dispatch(toggleCreateCreativeDialog());
  };

  const swiperData = React.useMemo(() => {
    return nativeAds?.map((nativeAd, idx) => {
      const {name} = nativeAd;

      const file = nativeAd?.assets?.[0];

      return (
        <SwiperItem
          name={name}
          file={file}
          handleClickName={handleOpenCreativeDetailDialog}
          item={nativeAd}
          onDelete={() => handleDeleteNativeAd(nativeAd.uuid)}
        />
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nativeAds]);

  return (
    <>
      <Row>
        <Col>
          <h5>Native Ads</h5>
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
        <NotFound
          entity="Native Ads"
          onClick={handleOpenCreateCreativeDialog}
        />
      )}

      <DialogConfirm
        open={isOpen}
        isLoading={isLoading}
        handleClose={handleClose}
        handleAgree={handleAgree}
      />

      <NativeAdDetail />
    </>
  );
}

NativeAds.propTypes = {};
NativeAds.defaultProps = {};

export default NativeAds;
