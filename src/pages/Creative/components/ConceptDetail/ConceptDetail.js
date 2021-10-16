// import PropTypes from 'prop-types';
import {useGetConcept} from 'queries/concept';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {selectConceptRedux, useCreativeSelector} from 'store/reducers/creative';

import ConceptForm from '../ConceptCreate/ConceptForm';
import {CreativeBodyLayout} from '../CreativeLayout';

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
        <ConceptForm isEdit concept={concept} />
      )}
    </CreativeBodyLayout>
  );
}

ConceptDetail.propTypes = {};
ConceptDetail.defaultProps = {};

export default ConceptDetail;
