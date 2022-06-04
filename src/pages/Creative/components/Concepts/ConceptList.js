import './index.scss';

import {Row} from 'antd';
import {BlockOverlay} from 'components/common';
// import PropTypes from 'prop-types';
import {useGetConceptsLoadMore} from 'queries/concept';
import * as React from 'react';
import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button} from 'reactstrap';
import {loadConceptRedux, useCreativeSelector} from 'store/reducers/creative';

import {ConceptsLoadMore} from './ConceptList.styles';
import ConceptListItemAnt from './ConceptListItemAnt';

const LIMIT = 10;

function ConceptList(props) {
  const {advertiserId} = useParams();
  const dispatch = useDispatch();
  const {expandedIds, selectedAdvertiserId} = useCreativeSelector();

  const {
    data: res,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useGetConceptsLoadMore({
    enabled: true,
    params: {
      ...(advertiserId && {advertiser_uuid: advertiserId}),
      limit: LIMIT,
      sort_by: 'created_at',
      sort: 'desc'
    }
  });

  React.useEffect(() => {
    const condition = !!(
      expandedIds.length &&
      selectedAdvertiserId === advertiserId &&
      expandedIds.includes(advertiserId)
    );

    if (condition) {
      const len = res?.pages?.length ?? 0;
      if (len > 1) {
        const items = res?.pages?.reduce((prev, cur) => {
          const concepts = cur?.data?.data ?? [];
          return [...prev, ...concepts];
        }, []);
        dispatch(loadConceptRedux(items));
      }
    }
  }, [advertiserId, dispatch, expandedIds, res?.pages, selectedAdvertiserId]);

  const conceptItemsRender = useMemo(() => {
    return res?.pages.map((group, index) => {
      return (
        <React.Fragment key={index}>
          {group?.data?.data?.map(item => {
            return <ConceptListItemAnt key={item.uuid} data={item} />;
          })}
        </React.Fragment>
      );
    });
  }, [res?.pages]);

  return (
    <div className="concept-list-wrapper">
      {status === 'loading' ? <BlockOverlay /> : null}
      <Row gutter={[16, 16]}>{conceptItemsRender}</Row>

      {hasNextPage && (
        <ConceptsLoadMore>
          <Button
            className="btn-wide mb-2 mr-2"
            color="primary"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more
          </Button>
        </ConceptsLoadMore>
      )}
    </div>
  );
}

ConceptList.propTypes = {};
ConceptList.defaultProps = {};

export default ConceptList;
