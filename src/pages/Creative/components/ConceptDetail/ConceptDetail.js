// import PropTypes from 'prop-types';
import {useGetConcept} from 'queries/concept';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {Col, Container, Row} from 'reactstrap';
import {selectConceptRedux, useCreativeSelector} from 'store/reducers/creative';

import {Banners} from '../Banners';
import ConceptForm from '../ConceptCreate/ConceptForm';
import {CreativeBodyLayout} from '../CreativeLayout';
import {ActionsBar, CreativeCreate} from '..';

function ConceptDetail(props) {
  const {conceptId, advertiserId} = useParams();
  const {isLoading, selectedConceptId} = useCreativeSelector();
  const dispatch = useDispatch();

  const {data: concept, isFetching} = useGetConcept({
    conceptId,
    enabled: !!conceptId
  });

  React.useEffect(() => {
    if (!isLoading && selectedConceptId !== conceptId) {
      dispatch(selectConceptRedux(conceptId, advertiserId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conceptId, isLoading, selectedConceptId]);

  return (
    <CreativeBodyLayout heading="Concept Detail">
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <ConceptForm isEdit concept={concept} />

          <div className="my-3">
            <Container fluid>
              <Row>
                <Col>
                  <ActionsBar />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Banners />
                </Col>
              </Row>
            </Container>
          </div>

          <CreativeCreate />
        </>
      )}
    </CreativeBodyLayout>
  );
}

ConceptDetail.propTypes = {};
ConceptDetail.defaultProps = {};

export default ConceptDetail;
