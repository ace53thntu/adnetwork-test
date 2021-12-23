//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useNavigate} from 'react-router-dom';
import {ListGroup} from 'reactstrap';

//---> Internal Modules
import {useGetAudiencesInfinity} from 'queries/audience';
import {AUDIENCES_INFINITY_SIDEBAR} from 'queries/audience/constants';
import {Pagination} from 'components/list/pagination';
import SidebarItem from './sidebar-item';
import {useDestructureAudiences} from 'pages/Audience/hooks';
import {SidebarLoadingStyled} from './styled';
import {RoutePaths} from 'constants/route-paths';

//---> Define prop types
const propTypes = {};

const AudienceSidebar = () => {
  const navigate = useNavigate();
  const hashPath = window.location.hash;
  const splitHash = hashPath.split('/').pop();
  const audienceId = splitHash ? splitHash : null;
  const {
    data: {pages = []} = {},
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetAudiencesInfinity({
    enabled: true,
    key: AUDIENCES_INFINITY_SIDEBAR
  });

  const audiences = useDestructureAudiences({pages});

  function onClickItem(evt, id) {
    evt.preventDefault();
    navigate(`/${RoutePaths.AUDIENCE}/${id}`);
  }

  return (
    <>
      {isFetching && <SidebarLoadingStyled>Loading...</SidebarLoadingStyled>}
      <ListGroup>
        {audiences?.map(audItem => (
          <SidebarItem
            key={`pr-${audItem?.uuid}`}
            isActived={audItem?.uuid === audienceId ? true : false}
            onClickItem={evt => onClickItem(evt, audItem?.uuid)}
            audience={audItem}
          />
        ))}
      </ListGroup>
      {hasNextPage && (
        <Pagination
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
};

AudienceSidebar.propTypes = propTypes;

export default AudienceSidebar;
