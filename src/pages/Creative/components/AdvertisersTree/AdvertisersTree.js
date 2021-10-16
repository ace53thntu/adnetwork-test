import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {ConceptAPI} from 'api/concept.api';
import {Tree} from 'components/common';
import {minimalTheme} from 'components/common/TreeLazy';
import {GET_CONCEPTS, GET_CONCEPTS_LOAD_MORE} from 'queries/concept/constants';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  expandAdvertiserRedux,
  loadConceptRedux,
  resetCreativeRedux,
  selectAdvertiserRedux,
  selectConceptRedux,
  setAdvertisersRedux,
  useCreativeSelector
} from 'store/reducers/creative';

import {TreeContainer} from './AdvertisersTree.styles';
import {advertisersMapData} from './dto';

const LIMIT = 10;

function AdvertisersTree(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    advertisers: advertisersRedux,
    selectedAdvertiserId,
    selectedConceptId
  } = useCreativeSelector();

  const queryClient = useQueryClient();

  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(1);

  async function init(currentPage) {
    const res = await AdvertiserAPIRequest.getAllAdvertiser({
      params: {
        page: currentPage,
        limit: LIMIT
      }
    });
    if (res?.data?.items?.length) {
      const items = advertisersMapData(res.data.items, currentPage);
      setTotal(res.data?.total ?? 0);
      dispatch(setAdvertisersRedux(items, currentPage));
    }
  }

  React.useEffect(() => {
    init(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (selectedConceptId) {
      async function initConcept() {
        const res = await getConcepts(selectedAdvertiserId);
        if (res?.data?.items?.length) {
          dispatch(loadConceptRedux(res.data.items));
        } else {
          dispatch(loadConceptRedux([]));
        }
      }

      const isExpanded = advertisersRedux?.find(
        item => item.id === selectedAdvertiserId
      )?.children?.length;
      if (!isExpanded) {
        initConcept();
      }
    }
  }, [selectedConceptId, selectedAdvertiserId, advertisersRedux, dispatch]);

  React.useEffect(() => {
    return () => {
      dispatch(resetCreativeRedux());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConcepts = advId => {
    try {
      return ConceptAPI.getConcepts({
        params: {
          advertiser_uuid: advId
        }
      });
    } catch (error) {
      return [];
    }
  };

  const loadChildren = React.useCallback(
    async (node, pageLimit, currentPage) => {
      const {isAdvertiser, id, expanded} = node;

      if (isAdvertiser) {
        const queryData = queryClient.getQueryData([
          GET_CONCEPTS_LOAD_MORE,
          node.id
        ]);
        console.log(
          '🚀 ~ file: AdvertisersTree.js ~ line 107 ~ queryData',
          queryData
        );

        if (expanded) {
          //
        } else {
          if (queryData?.pages?.length) {
            const items = queryData.pages.reduce((prev, cur) => {
              const {
                data: {items}
              } = cur;
              return [...prev, ...items];
            }, []);

            const children = items?.map(({uuid, name}) => ({
              id: uuid,
              name,
              children: [],
              numChildren: 0,
              page: 0,
              expanded: false,
              selected: false,
              parentId: node.id,
              isConcept: true
            }));
            return children;
          } else {
            if (id !== selectedAdvertiserId) {
              const res = await getConcepts(id);
              if (res?.data?.items?.length) {
                const items = res.data.items;

                queryClient.setQueryData([GET_CONCEPTS_LOAD_MORE, node.id], {
                  pageParams: [undefined],
                  pages: [res]
                });

                const children = items?.map(({uuid, name}) => ({
                  id: uuid,
                  name,
                  children: [],
                  numChildren: 0,
                  page: 0,
                  expanded: false,
                  selected: false,
                  parentId: node.id,
                  isConcept: true,
                  isAdvertiser: false
                }));
                return children;
              }
            }
            return [];
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAdvertiserId]
  );

  const handleSelect = React.useCallback((event, node, state) => {
    const {isAdvertiser, isConcept, parentId} = node;
    if (isAdvertiser) {
      dispatch(selectAdvertiserRedux(node.id));
      navigate(`${node.id}`);
    }

    if (isConcept) {
      dispatch(selectConceptRedux(node.id, parentId));
      navigate(`${parentId}/${node.id}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = React.useCallback(
    (event, node, state) => {
      const {isAdvertiser, id} = node;

      if (isAdvertiser) {
        if (id !== selectedAdvertiserId) {
          dispatch(expandAdvertiserRedux(node.id, state));
          // navigate(`${node.id}`);
        } else {
          dispatch(expandAdvertiserRedux(node.id, state));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAdvertiserId]
  );

  const totalPage = Math.ceil(total / 10);

  const handleLoadMoreInRoot = React.useCallback(() => {
    if (totalPage > page) {
      setPage(page + 1);
      init(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPage]);

  return (
    <TreeContainer>
      <Tree
        paginated
        pageLimit={LIMIT}
        theme={minimalTheme}
        nodes={advertisersRedux}
        isLast={page === totalPage}
        Checkbox={() => null}
        loadChildren={loadChildren}
        selectCallback={handleSelect}
        toggleCallback={handleToggle}
        handleLoadMoreInRoot={handleLoadMoreInRoot}
      />
    </TreeContainer>
  );
}

AdvertisersTree.propTypes = {};
AdvertisersTree.defaultProps = {};

export default AdvertisersTree;
