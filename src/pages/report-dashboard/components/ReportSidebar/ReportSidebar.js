//---> Build-in Modules
import React from 'react';

//---> External Modules
import {ListGroup, ListGroupItem} from 'reactstrap';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';

//---> Internal Modules
import './_main.scss';
import {checkIsFollowed} from 'pages/report-dashboard/helpers';
import {getUser} from 'utils/helpers/auth.helpers';
import {useGetReportPagesInfinite} from 'queries/report-page';
import {validArray} from 'utils/helpers/dataStructure.helpers';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import {RoutePaths} from 'constants/route-paths';

function ReportSidebar({pageId}) {
  const currentUser = getUser();
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetReportPagesInfinite({
    params: {limit: DEFAULT_PAGINATION.perPage},
    enabled: true
  });
  const listPages = React.useMemo(() => {
    return pages?.reduce((acc, item) => {
      const {items = []} = item;
      return [...acc, ...items];
    }, []);
  }, [pages]);
  const destructurePages = React.useMemo(() => {
    return listPages?.map((pageItem = {}) => {
      const isFollowed = checkIsFollowed({page: pageItem, currentUser});
      return {
        ...pageItem,
        followed: isFollowed
      };
    });
  }, [currentUser, listPages]);
  const navigate = useNavigate();

  const handleClickItem = (evt, _pageId) => {
    evt.preventDefault();
    navigate(`/${RoutePaths.DASHBOARD}/${RoutePaths.PAGE}/${_pageId}`);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-2">
      <ListGroup>
        {validArray({list: destructurePages}) ? (
          destructurePages?.map(pageItem => {
            return (
              <ListGroupItem
                key={`pr-${pageItem?.uuid}`}
                className={`report-page-item ${
                  pageItem?.id === parseInt(pageId, 10)
                    ? 'report-page-item-selected'
                    : ''
                }`}
                onClick={evt => handleClickItem(evt, pageItem?.uuid)}
              >
                <span className="page-item-title">{pageItem?.name} </span>
                <FontAwesomeIcon
                  className={pageItem?.followed ? 'followed' : 'unfollowed'}
                  icon={faThumbsUp}
                  title={pageItem?.followed ? 'Followed' : 'Unfollow'}
                />
              </ListGroupItem>
            );
          })
        ) : (
          <ListGroupItem disabled>No Page</ListGroupItem>
        )}
      </ListGroup>
      {hasNextPage && (
        <Pagination
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  );
}

export default ReportSidebar;
