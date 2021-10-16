import React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {
  selectAdvertiserRedux,
  useCreativeSelector
} from 'store/reducers/creative';

export function useDispatchSelectAdvertiser() {
  const {advertiserId} = useParams();
  const dispatch = useDispatch();
  const {isLoading, selectedAdvertiserId} = useCreativeSelector();

  React.useEffect(() => {
    if (!isLoading && selectedAdvertiserId !== advertiserId) {
      dispatch(selectAdvertiserRedux(advertiserId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertiserId, isLoading, selectedAdvertiserId]);
}
