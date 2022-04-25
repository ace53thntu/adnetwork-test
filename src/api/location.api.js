import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class LocationAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllGeo = ({params = null, options}) => {
    return this.get(`${endpoints.location.geo_location}`, params, options);
  };

  getAllCountry = ({params = null, options}) => {
    return this.get(`${endpoints.location.geo_country}`, params, options);
  };

  getCountry = ({id, params = null, options}) => {
    return this.get(`${endpoints.location.geo_country}/${id}`, params, options);
  };

  createCountry = ({data, options}) => {
    return this.post(endpoints.location.geo_country, data, options);
  };

  editCountry = ({id, data, options}) => {
    return this.put(`${endpoints.location.geo_country}/${id}`, data, options);
  };

  deleteCountry = ({id, params}) => {
    return this.delete(`${endpoints.location.geo_country}/${id}`, params);
  };

  getAllCity = ({params = null, options}) => {
    return this.get(`${endpoints.location.geo_city}`, params, options);
  };

  getCity = ({id, params = null, options}) => {
    return this.get(`${endpoints.location.geo_city}/${id}`, params, options);
  };

  createCity = ({data, options}) => {
    return this.post(endpoints.location.geo_city, data, options);
  };

  editCity = ({id, data, options}) => {
    return this.put(`${endpoints.location.geo_city}/${id}`, data, options);
  };

  deleteCity = ({id, params}) => {
    return this.delete(`${endpoints.location.geo_city}/${id}`, params);
  };
}

export const LocationAPIRequest = new LocationAPI(apiURL);
