//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import {DialogConfirm, LoadingIndicator} from 'components/common';
import {ChartModes, ChartTypes} from 'constants/report';
import {useDeleteReport} from 'queries/report';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {
  setChartTypeSelectedRedux,
  setMetricBodyRedux
} from 'store/reducers/entity-report';
import ChartItem from '../chart-item/ChartItem';
import {
  DefaultColor,
  PublisherReportBys,
  ReportGroupTypes
} from '../../constants.js/index.js';
import ModalReportForm from '../../ReportCreateModal';
import {useChartData} from '../../hooks';
import MetricInfo from './MetricInfo';
import {ReportItemStyled} from '../../styled';
import {parseColors} from '../../utils';
import {getMetricRequestBody} from '../../utils/metricRequest';
import {getReportById} from '../../utils/getReportById';

//---> Styles
import '../../styles/styles.scss';
import {useMappingMetricSet} from 'pages/entity-report/hooks/useMappingMetricSet';
import ReportName from './ReportName';
import {exportFile} from 'pages/entity-report/utils/exportExcelFile';
import styled from 'styled-components';

const IconStyled = styled(Button)`
  padding: 5px;
  color: ${props => (props?.isDeleted ? 'red' : 'blue')};
  &hover {
    color: ${props => (props?.isDeleted ? 'red' : 'blue')};
    opacity: 0.7;
  }
  & i {
    font-size: 18px;
  }
`;

export default function ReportItem({
  entityId,
  entityType,
  metricType,
  distributionBy,
  reportItem = {},
  isViewed = false,
  isSelected = false,
  modeSelectReport = false,
  handleSelectedReport = () => null,
  metrics = null,
  isFetching = true
}) {
  const dispatch = useDispatch();
  const {
    uuid: reportId,
    api: {time_unit: unit, time_range: timeRange, report_by} = {},
    report_source,
    report_type,
    name
  } = reportItem;
  const properties = reportItem?.properties;
  const metricRequestBody = getMetricRequestBody({report: reportItem});
  const reportGroup = PublisherReportBys.map(item => item.value).includes(
    report_source
  )
    ? ReportGroupTypes.PUBLISHER
    : ReportGroupTypes.ADVERTISER;

  const color = properties?.color || [DefaultColor];
  const chartType = properties?.chart_type || ChartTypes.LINE;
  const chartMode = properties?.mode || ChartModes.BY;
  const metricSetRes = properties?.metric_set || [];
  const parentPath = properties?.parentPath || '';
  const colors = parseColors(color, metricSetRes);
  const reportByUuid = getReportById({report: reportItem, entityId});

  const {mutateAsync: deleteReport} = useDeleteReport();
  const metricSet = useMappingMetricSet({metricSet: metricSetRes, reportGroup});
  const metricData = useChartData({
    type: chartType,
    metrics,
    unit,
    timeRange,
    metricSet,
    entityId: reportByUuid,
    chartType,
    chartMode,
    colors
  });

  const [openModal, setOpenModal] = React.useState(false);
  const [showDialogConfirm, setShowDialogConfirm] = React.useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

  const toggleModal = () => {
    if (!isFetching) {
      setOpenModal(prevState => !prevState);
    }
  };

  const handleOpenModal = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    if (isSelected) {
      return;
    }
    dispatch(setMetricBodyRedux(metricRequestBody));
    dispatch(setChartTypeSelectedRedux(chartType));
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleCancelDelete = () => {
    setShowDialogConfirm(false);
  };

  const handleSubmitDelete = async () => {
    setIsLoadingDelete(true);
    try {
      await deleteReport({reportId});
      ShowToast.success('Deleted report successfully');
      setShowDialogConfirm(false);
    } catch (err) {
      ShowToast.error('Fail to delete report');
    }
    setIsLoadingDelete(false);
  };

  const onClickDelete = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    setShowDialogConfirm(true);
  };

  return (
    <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
      <ReportItemStyled isLoading={isFetching} onClick={handleOpenModal}>
        <div className="d-flex justify-content-center align-items-center">
          <ReportName
            name={name}
            parentPath={parentPath}
            reportSource={report_source}
            metricSet={metricSetRes}
          />
          <div
            className={`chx-report ${modeSelectReport ? 'd-flex' : 'd-none'}`}
          >
            <Checkbox
              inputProps={{'aria-label': 'primary checkbox'}}
              onChange={evt =>
                handleSelectedReport({
                  evt,
                  reportId,
                  metricData,
                  metricSet,
                  chartType,
                  color,
                  unit,
                  distribution_by: distributionBy,
                  metric_type: metricType,
                  time_range: timeRange
                })
              }
              onClick={evt => evt.stopPropagation()}
            />
          </div>
          {!isFetching && !isViewed && (
            <div className="delete-report">
              <IconStyled
                type="button"
                color="link"
                onClick={evt =>
                  exportFile({
                    evt,
                    metricData,
                    metricSet,
                    timeUnit: unit,
                    reportBy: report_by,
                    reportName: name,
                    timeRange,
                    reportSource: report_source,
                    reportType: report_type,
                    parentPath
                  })
                }
                title="Export"
              >
                <i className="pe-7s-download"></i>
              </IconStyled>
              <IconStyled
                type="button"
                color="link"
                onClick={onClickDelete}
                title="Delete"
                isDeleted
              >
                <i className="pe-7s-trash"></i>
              </IconStyled>
            </div>
          )}
        </div>
        {isFetching && <LoadingIndicator type="ball-clip-rotate-multiple" />}
        {metricData ? (
          <div>
            <ChartItem
              chartType={chartType}
              colors={colors}
              unit={unit}
              chartData={metricData}
            />
            <MetricInfo
              timeRange={timeRange}
              unit={unit}
              reportSource={report_source}
              reportBy={report_by}
              reportType={report_type}
            />
          </div>
        ) : (
          <div className="no-report">No report</div>
        )}
      </ReportItemStyled>

      {openModal && (
        <ModalReportForm
          modal={openModal}
          toggle={toggleModal}
          metricSet={metricSet}
          chartTypeDefault={chartType}
          reportItem={reportItem}
          isEdit
          unit={unit}
          timeRange={timeRange}
          closeModal={closeModal}
          isViewed={isViewed}
          entityType={entityType}
          metricType={metricType}
          distributionBy={distributionBy}
          entityId={entityId}
          reportId={reportId}
        />
      )}
      {showDialogConfirm && (
        <DialogConfirm
          open={showDialogConfirm}
          title={'Are you sure?'}
          handleClose={handleCancelDelete}
          handleAgree={handleSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </div>
  );
}

ReportItem.propTypes = {
  reportUrl: PropTypes.string,
  entityId: PropTypes.string,
  entityType: PropTypes.string,
  metricType: PropTypes.string,
  distributionBy: PropTypes.string,
  reportItem: PropTypes.object,
  isViewed: PropTypes.bool,
  isSelected: PropTypes.bool,
  modeSelectReport: PropTypes.bool,
  handleSelectedReport: PropTypes.func
};
