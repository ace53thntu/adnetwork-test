import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class ConceptAPIService extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getConcepts = ({params = {}, options = {}}) => {
    return this.get(endpoints.concept.concepts, params, options);
  };

  createConcept = ({data, options = {}}) => {
    return this.post(endpoints.concept.concept, data, options);
  };

  getConcept = ({conceptId, options = {}}) => {
    return this.get(`${endpoints.concept.concept}/${conceptId}`, {}, options);
  };

  updateConcept = ({conceptId, data, options = {}}) => {
    return this.put(`${endpoints.concept.concept}/${conceptId}`, data, options);
  };

  deleteConcept = ({conceptId, options = {}}) => {
    return this.delete(
      `${endpoints.concept.concept}/${conceptId}`,
      {},
      options
    );
  };
}

export const ConceptAPI = new ConceptAPIService(apiURL);
