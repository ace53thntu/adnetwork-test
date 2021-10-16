import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {ConceptAPI} from 'api/concept.api';
import {Tree} from 'components/common';
import {minimalTheme} from 'components/common/TreeLazy';
import {GET_CONCEPTS} from 'queries/concept/constants';
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

function AdvertisersTree(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    advertisers: advertisersRedux,
    selectedAdvertiserId,
    selectedConceptId
  } = useCreativeSelector();

  const queryClient = useQueryClient();

  async function init(conceptId) {
    const res = await AdvertiserAPIRequest.getAllAdvertiser({});
    if (res?.data?.items?.length) {
      const items = advertisersMapData(res.data.items);
      dispatch(setAdvertisersRedux(items));
    }
  }

  React.useEffect(() => {
    init();
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
        if (expanded) {
          //
        } else {
          const queryData = queryClient.getQueryData([
            GET_CONCEPTS,
            {advertiser_uuid: id}
          ]);

          if (queryData?.data?.items) {
            const items = queryData.data.items;

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

                queryClient.setQueryData(
                  [GET_CONCEPTS, {advertiser_uuid: id}],
                  res
                );

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

  return (
    <TreeContainer>
      <Tree
        paginated
        pageLimit={10}
        nodes={advertisersRedux}
        loadChildren={loadChildren}
        theme={minimalTheme}
        Checkbox={() => null}
        selectCallback={handleSelect}
        toggleCallback={handleToggle}
      />
    </TreeContainer>
  );
}

AdvertisersTree.propTypes = {};
AdvertisersTree.defaultProps = {};

export default AdvertisersTree;
