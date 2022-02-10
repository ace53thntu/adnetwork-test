import {DialogConfirm, SwiperList} from 'components/common';
// import PropTypes from 'prop-types';
import {useDeleteCreative, useGetCreatives} from 'queries/creative';
import {GET_CREATIVES} from 'queries/creative/constants';
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

import {BannerDetail} from '../BannerDetail';
import {TABS} from '../CreativeCreate/constants';
import {NotFound} from '../NotFound';
import {SwiperItem} from '../SwiperItem';

function Banners(props) {
  const {conceptId} = useParams();
  const client = useQueryClient();
  const dispatch = useDispatch();

  const params = React.useMemo(() => {
    return {
      concept_uuid: conceptId,
      status: 'active',
      sort_by: 'updated_at',
      sort: 'desc'
    };
  }, [conceptId]);

  const {data: res} = useGetCreatives({
    params
  });

  const {mutateAsync: deleteCreativeRequest} = useDeleteCreative();

  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const banners = res;

  const handleClose = () => {
    setIsOpen(false);
    setDeleteId(null);
    setIsLoading(false);
  };

  const handleDeleteCreative = React.useCallback(
    creativeId => {
      setDeleteId(creativeId);
      setIsOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const handleAgree = React.useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteCreativeRequest(deleteId);
      ShowToast.success('Remove Creative successfully!');
      handleClose();
      client.invalidateQueries([GET_CREATIVES, params]);
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.message);
    }
  }, [client, deleteCreativeRequest, deleteId, params]);

  const handleOpenCreativeDetailDialog = React.useCallback(creative => {
    dispatch(toggleCreativeDetailDialog(creative?.uuid, 'banner'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenCreateCreativeDialog = () => {
    dispatch(toggleCreateCreativeDialog(TABS.banner));
  };

  const swiperData = React.useMemo(() => {
    return banners?.map((creative, idx) => {
      const {name} = creative;

      const file = creative?.alternatives?.[0];

      return (
        <SwiperItem
          isCreative
          name={name}
          file={file}
          handleClickName={handleOpenCreativeDetailDialog}
          item={creative}
          onDelete={() => handleDeleteCreative(creative.uuid)}
        />
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banners]);

  return (
    <>
      <Row>
        <Col>
          <h5>Banners</h5>
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
        <NotFound entity="Banners" onClick={handleOpenCreateCreativeDialog} />
      )}

      <DialogConfirm
        open={isOpen}
        isLoading={isLoading}
        handleClose={handleClose}
        handleAgree={handleAgree}
      />

      <BannerDetail />
    </>
  );
}

Banners.propTypes = {};
Banners.defaultProps = {};

export default React.memo(Banners);
