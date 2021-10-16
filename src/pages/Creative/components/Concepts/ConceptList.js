import {BlockOverlay} from 'components/common';
// import PropTypes from 'prop-types';
import {useGetConceptsLoadMore} from 'queries/concept';
import * as React from 'react';
import {Link, useParams} from 'react-router-dom';
import {Button, Card, CardBody} from 'reactstrap';

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

const LIMIT = 10;

function ConceptList(props) {
  const {advertiserId} = useParams();

  const {
    data: res,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetConceptsLoadMore({
    advertiserId,
    limit: LIMIT,
    enabled: !!advertiserId
  });

  return (
    <Card className="main-card mb-3">
      {isFetching ? <BlockOverlay /> : null}
      <CardBody>
        <ConceptsContainer>
          <AddConceptContainer>
            <Link to={`create`}>
              <div className="concept">
                <div className="thumb concept-thumb">
                  <AddConceptContainerBody>
                    <div className="images-container d-flex align-items-center justify-content-center">
                      {/* TODO remove ThemeProvider, custom MButton directly instead */}
                      <ThemeProvider theme={btnTheme}>
                        <Tooltip title="Create new concept">
                          <MButton
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                          ></MButton>
                        </Tooltip>
                      </ThemeProvider>
                    </div>
                  </AddConceptContainerBody>
                </div>
              </div>
            </Link>
          </AddConceptContainer>

          {res?.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group?.data?.items?.map((item, index) => (
                  <ConceptListItem
                    key={index}
                    data={conceptItemRepoToView(item)}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </ConceptsContainer>

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
      </CardBody>
    </Card>
  );
}

ConceptList.propTypes = {};
ConceptList.defaultProps = {};

export default ConceptList;
