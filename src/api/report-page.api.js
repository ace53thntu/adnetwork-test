import {XHRRequest} from 'utils/helpers/xhr.helpers';
import {endpoints} from './constants';

// eslint-disable-next-line no-undef
const apiURL = DMP_API_ENDPOINTS.API_GATEWAY;

class ReportPageAPI extends XHRRequest {
  constructor(url) {
    super({apiURL: url});
  }

  getAllReportPage = ({params = null, options}) => {
    return this.get(`${endpoints.reportPage.reportPage}`, params, options);
  };

  getReportPage = ({id, params = null, options}) => {
    return this.get(
      `${endpoints.reportPage.reportPage}/${id}`,
      params,
      options
    );
  };

  createReportPage = ({data, options}) => {
    return this.post(endpoints.reportPage.reportPage, data, options);
  };

  editReportPage = ({id, data, options}) => {
    return this.put(`${endpoints.reportPage.reportPage}/${id}`, data, options);
  };

  deleteReportPage = ({id, params}) => {
    return this.delete(`${endpoints.reportPage.reportPage}/${id}`, params);
  };

  followReportPage = ({data, options}) => {
    return this.post(
      `${endpoints.reportPage.reportPage}/${endpoints.reportPage.follow}`,
      data,
      options
    );
  };
}

export const ReportPageAPIRequest = new ReportPageAPI(apiURL);
