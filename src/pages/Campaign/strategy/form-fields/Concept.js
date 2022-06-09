//---> Build-in Modules
import React from 'react';

//---> External Modules
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {useGetConceptsLoadMore} from 'queries/concept';
import {ConceptList} from './concept-list';
import {useQueryString} from 'hooks';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import {LoadingIndicator} from 'components/common';
import {getResponseData} from 'utils/helpers/misc.helpers';

const Concept = ({
  strategyData,
  isSummary = false,
  isView = false,
  conceptList = []
}) => {
  const query = useQueryString();
  const advertiserId = query.get('advertiser_id');
  const {
    data: {pages = []} = {},
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetConceptsLoadMore({
    params: {
      advertiser_uuid: advertiserId,
      per_page: DEFAULT_PAGINATION.perPage,
      status: 'active'
    }
  });
  const conceptsSelected = strategyData?.concepts || [];
  const concepts = React.useMemo(() => {
    return isView
      ? conceptList
      : pages?.reduce((acc, page = {}) => {
          const items = getResponseData(page, IS_RESPONSE_ALL);
          const itemsDestructured = items?.map(item => ({
            ...item,
            id: item?.uuid
          }));
          acc = [...acc, ...itemsDestructured];
          return acc;
        }, []);
  }, [isView, conceptList, pages]);

  return (
    <>
      {isFetching && <LoadingIndicator />}
      <ConceptList
        concepts={concepts}
        isView={isView}
        conceptsSelected={conceptsSelected}
      />
      {hasNextPage && !isView && (
        <Pagination
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
      {!concepts || concepts.length === 0 ? (
        <div>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-warning"
          />{' '}
          You don't have any concept
        </div>
      ) : null}
    </>
  );
};

export default Concept;
