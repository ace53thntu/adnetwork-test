//---> Build-in Modules
import React, {useState} from 'react';

//---> External Modules
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown,
  Button,
  Spinner
} from 'reactstrap';
import {faUsersCog} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

//---> Internal Modules
// import {useCreateReport} from 'core/queries/report';
// import ReportItem from 'page/ReportDashboard/components/ReportItem/ReportItem';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import { ApiError } from 'components/common';

const StrategyReport = () => {
  // const {mutateAsync: createReport} = useCreateReport();
  const createReport = new Promise(resolve => resolve('ok'));
  const [currentType, setCurrentType] = useState('count-chart');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeReportType = type => {
    setCurrentType(type);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        name: `Strategy report - ${moment().format('DD-MM-YYYY hh:mm')}`,
        type: 'overview',
        service: 'test service',
        strategy_id: 1,
        properties: {
          config: {
            chart_type: currentType,
            color: 'red',
            time_frame: moment().format('DD-MM-YYYY hh:mm:ss')
          }
        },
        api: `/mock-endpoint-${uuidv4()}`
      };
      await createReport(data);
      ShowToast.success('Created report successfully');
    } catch (error) {
      ShowToast.error(<ApiError apiError={error || 'Fail to create new report'}/>);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      <Row className="mb-3">
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className="w-100 d-flex justify-content-end">
                <UncontrolledButtonDropdown className="success">
                  <DropdownToggle caret>
                    <FontAwesomeIcon icon={faUsersCog} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => handleChangeReportType('count-chart')}
                    >
                      Counting
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleChangeReportType('bar-chart')}
                    >
                      Bar chart
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleChangeReportType('line-chart')}
                    >
                      Line Chart
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              {/* <ReportItem reportType={currentType} /> */}

              <div className="report-action d-flex justify-content-end">
                <Button
                  type="button"
                  color="primary"
                  onClick={onSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" color="light" /> Creating...
                    </>
                  ) : (
                    'Create Report'
                  )}
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StrategyReport;
