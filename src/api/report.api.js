import {XHRRequest} from 'utils/helpers/xhr.helpers';

import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = ADN_API_ENDPOINTS.API_GATEWAY;

class ReportAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllReport = ({params = null, options}) => {
    return this.get(`${endpoints.report.report}`, params, options);
  };

  getReport = ({id, params = null, options}) => {
    return this.get(`${endpoints.report.report}/${id}`, params, options);
  };

  createReport = ({data, options}) => {
    return this.post(endpoints.report.report, data, options);
  };

  editReport = ({id, data, options}) => {
    return this.put(`${endpoints.report.report}/${id}`, data, options);
  };

  deleteReport = ({id, params}) => {
    return this.delete(`${endpoints.report.report}/${id}`, params);
  };

  generateReportUrl = ({data, options} = {}) => {
    return this.post(`${endpoints.metric.metric}`, data, options);
  };
}

export const ReportAPIRequest = new ReportAPI(apiURL);
