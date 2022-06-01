import {BlockOverlay} from 'components/common';
// import PropTypes from 'prop-types';
import {useGetConceptsLoadMore} from 'queries/concept';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {Button, Card, CardBody} from 'reactstrap';
import {loadConceptRedux, useCreativeSelector} from 'store/reducers/creative';

import MButton from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import {ThemeProvider} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import {
  AddConceptContainer,
  AddConceptContainerBody,
  ConceptsContainer,
  ConceptsLoadMore,
  btnTheme
} from './ConceptList.styles';
import ConceptListItem from './ConceptListItem';
import {conceptItemRepoToView} from './dto';
import ConceptListItemAnt from "./ConceptListItemAnt";
import {Row} from "antd";
import "./index.scss";

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
    enabled: !!advertiserId,
    params: {
      advertiser_uuid: advertiserId,
      limit: LIMIT
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

  return (
    <div className="concept-list-wrapper">
      {status === 'loading' ? <BlockOverlay /> : null}
      <Row gutter={[16, 16]}>
        {res?.pages.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group?.data?.data?.map((item, index) => (
                /*                  <ConceptListItem
                                    key={index}
                                    data={conceptItemRepoToView(item)}
                                  />*/

                <ConceptListItemAnt
                  key={index}
                  data={conceptItemRepoToView(item)}
                />
              ))}
            </React.Fragment>
          );
        })}
      </Row>

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
